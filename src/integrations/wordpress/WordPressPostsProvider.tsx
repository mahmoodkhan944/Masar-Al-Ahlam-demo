import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

declare global {
    const wvcClient: any;
}

/** -------- Types -------- */
export interface Post {
    id: string;
    title: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    link?: string;
    date?: string;
    author?: Author;
    featuredImage?: string;
    categories?: Term[];
    tags?: Term[];
}

export interface Term {
    id: number;
    name: string;
    slug: string;
    taxonomy: string; // e.g., "category" or "post_tag"
    link?: string;
}

export interface Author {
    id: number;
    name: string;
    slug?: string;
    link?: string;
    avatar?: Record<string, string>; // Avatar image URLs keyed by size (e.g., "24", "48", "96")
}

type QueryParams = Record<string, any>;

interface PostsContextType {
    // data
    posts: Post[];
    total: number;
    totalPages: number;

    // status
    loading: boolean;
    isRefetching: boolean;
    error: string | null;

    // current query state (editable from children)
    query: QueryParams;
    embeds: string[];
    fields: string[];

    /**
     * Mutation helpers (children can drive queries)
     *
     * - setQuery: merges into the existing query by default (update mode). Pass a function to fully replace.
     * - setEmbeds: replaces the entire array by default (reset mode). Pass a function to update/merge manually.
     * - setFields: same as setEmbeds — replace by default, update if you pass a function.
     */
    setQuery: (next: Partial<QueryParams> | ((prev: QueryParams) => QueryParams)) => void;
    setEmbeds: (next: string[] | ((prev: string[]) => string[])) => void;
    setFields: (next: string[] | ((prev: string[]) => string[])) => void;

    // pagination helpers
    hasNext: boolean;
    hasPrev: boolean;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;

    // network
    refetch: () => Promise<void>;
    fetch: (opts?: {
        wp_query?: Partial<QueryParams>;
        embeds?: string[];
        fields?: string[];
        append?: boolean;
        refresh?: boolean; // force isRefresh mode
    }) => Promise<void>;
}

// Convert a single WP REST post (with optional _embedded) into our Post type
const normalizePost = (raw: any): Post => {
    const title =
        raw?.title?.rendered ?? raw?.title ?? raw?.post_title ?? String(raw?.title || raw?.name || "Untitled");
    const excerpt = raw?.excerpt?.rendered ?? raw?.excerpt ?? raw?.post_excerpt ?? undefined;
    const content = raw?.content?.rendered ?? raw?.content ?? raw?.post_content ?? undefined;

    const link = raw?.resolved_url || raw?.link || raw?.url || undefined;

    const featuredImage =
        raw?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ??
        raw?.featured_media_url ??
        undefined;

    const authorRaw = raw?._embedded?.author?.[0];
    const author: Author | undefined = authorRaw
        ? {
            id: Number(authorRaw?.id ?? 0),
            name: String(authorRaw?.name ?? ""),
            slug: authorRaw?.slug ?? "",
            link: authorRaw?.link,
            avatar: authorRaw?.avatar_urls as Record<string, string> | undefined, // Avatar image URLs keyed by size (e.g., "24", "48", "96")
        }
        : undefined;

    // Helper to map a WP term object into our Term type
    const mapTerm = (t: any): Term => ({
        id: Number(t?.id ?? 0),
        name: String(t?.name ?? ""),
        slug: String(t?.slug ?? ""),
        taxonomy: String(t?.taxonomy ?? ""),
        link: t?.link,
    });

    // Category & tag objects from _embedded.wp:term (array of arrays)
    const termGroups: any[][] | undefined = raw?._embedded?.["wp:term"];
    const categories: Term[] | undefined = Array.isArray(termGroups)
        ? termGroups
            .reduce((acc, group) => acc.concat(group), [])
            .filter((t: any) => t && t.taxonomy === "category")
            .map(mapTerm)
        : undefined;
    const tags: Term[] | undefined = Array.isArray(termGroups)
        ? termGroups
            .reduce((acc, group) => acc.concat(group), [])
            .filter((t: any) => t && t.taxonomy === "post_tag")
            .map(mapTerm)
        : undefined;

    return {
        id: String(raw?.id ?? raw?.ID),
        title: String(title),
        slug: raw?.slug,
        excerpt: typeof excerpt === "string" ? excerpt : undefined,
        content: typeof content === "string" ? content : undefined,
        link,
        date: raw?.date || raw?.post_date || undefined,
        author,
        featuredImage,
        categories: categories && categories.length ? categories : undefined,
        tags: tags && tags.length ? tags : undefined,
    };
};

export const convertWPResponseToPosts = (input: any): Post[] => {
    if (!Array.isArray(input)) return [];
    return input.map(normalizePost);
};

const PostsContext = createContext<PostsContextType | null>(null);

export const usePosts = () => {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error("usePosts must be used within a WordPressPostsProvider");
    return ctx;
};

type WordPressPostsProviderProps = {
    children: React.ReactNode;
    wp_query?: QueryParams; // initial query args
    embeds?: string[];      // initial embeds
    fields?: string[];      // initial fields
};


const WordPressPostsProvider = ({
                                    children,
                                    wp_query = {},
                                    embeds = [],
                                    fields = [],
                                }: WordPressPostsProviderProps) => {
    // Editable query state (seeded from props)
    const [query, setQueryState] = useState<QueryParams>(wp_query);
    const [embedsState, setEmbedsState] = useState<string[]>(embeds);
    const [fieldsState, setFieldsState] = useState<string[]>(fields);

    // Data + status
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isRefetching, setIsRefetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    // Sync state if parent props change (treat props as "initial but updatable")
    useEffect(() => {
        setQueryState(wp_query || {});
    }, [JSON.stringify(wp_query)]);

    useEffect(() => {
        setEmbedsState(embeds || []);
    }, [JSON.stringify(embeds)]);

    useEffect(() => {
        setFieldsState(fields || []);
    }, [JSON.stringify(fields)]);

    const handleError = (e?: unknown) => {
        const msg = (e as any)?.message ?? String(e);
        setError(msg);
    };

    const effectiveDeps = [
        JSON.stringify(query),
        JSON.stringify(embedsState),
        JSON.stringify(fieldsState),
    ];

    const fetch = (opts?: {
        wp_query?: Partial<QueryParams>;
        embeds?: string[];
        fields?: string[];
        append?: boolean;
        refresh?: boolean;
    }): Promise<void> => {
        const isRefresh = Boolean(opts?.refresh);
        if (isRefresh && isRefetching) return Promise.resolve();

        setError(null);
        if (isRefresh) setIsRefetching(true);
        else setLoading(true);

        const mergedQuery: QueryParams = {
            ...query,
            ...(opts?.wp_query || {}),
        };
        const usedEmbeds = opts?.embeds ?? embedsState;
        const usedFields = opts?.fields ?? fieldsState;

        return wvcClient.getPosts({
            wp_query: mergedQuery,
            embeds: usedEmbeds,
            fields: usedFields,
        }).then((res: any) => {
            const normalized = (res?.posts ?? []).map(normalizePost);
            setPosts(prev => (opts?.append ? [...prev, ...normalized] : normalized));
            setTotal(Number(res?.total ?? 0));
            setTotalPages(Number(res?.total_pages ?? 0));
        }).catch((e: any) => {
            handleError(e);
        }).finally(() => {
            if (isRefresh) setIsRefetching(false);
            else setLoading(false);
        });
    };

    // Initial + reactive fetch when query knobs change
    useEffect(() => {
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, effectiveDeps);

    const refetch = (): Promise<void> => fetch({refresh: true});

    // Expose convenient setters to children
    const setQuery: PostsContextType["setQuery"] = (next) => {
        setQueryState(prev => (typeof next === "function" ? (next as any)(prev) : {...prev, ...next}));
        };

    const setEmbeds: PostsContextType["setEmbeds"] = (next) => {
        setEmbedsState(prev => (typeof next === "function" ? (next as any)(prev) : next));
        };

    const setFields: PostsContextType["setFields"] = (next) => {
        setFieldsState(prev => (typeof next === "function" ? (next as any)(prev) : next));
    };

    // Pagination helpers derived from current query & totals
    const currentPage = Number(query?.page ?? 1) || 1;
    const hasNext = currentPage < (totalPages || 0);
    const hasPrev = currentPage > 1;

    const setPage = (page: number) => setQuery({page: Math.max(1, Math.floor(page || 1))});
    const nextPage = () => hasNext && setPage(currentPage + 1);
    const prevPage = () => hasPrev && setPage(currentPage - 1);

    const value: PostsContextType = useMemo(() => ({
        // data
        posts,
        total,
        totalPages,

        // status
        loading,
        isRefetching,
        error,

        // state
        query,
        embeds: embedsState,
        fields: fieldsState,

        // setters
        setQuery,
        setEmbeds,
        setFields,

        // pagination
        hasNext,
        hasPrev,
        setPage,
        nextPage,
        prevPage,

        // network
        refetch,
        fetch,
    }), [
        posts,
        total,
        totalPages,
        loading,
        isRefetching,
        error,
        query,
        embedsState,
        fieldsState,
        hasNext,
        hasPrev,
    ]);

    return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>;
};

export {WordPressPostsProvider, WordPressPostsProvider as PostsProvider};

