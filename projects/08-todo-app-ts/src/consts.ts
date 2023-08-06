export const TODO_FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const;

export const FILTERS_BUTTONS = {
    [TODO_FILTERS.ALL]: {
        literal: "All",
        href: "/?filter=all"
    },
    [TODO_FILTERS.ACTIVE]: {
        literal: "Active",
        href: "/?filter=active"
    },
    [TODO_FILTERS.COMPLETED]: {
        literal: "Completed",
        href: "/?filter=completed"
    }
} as const