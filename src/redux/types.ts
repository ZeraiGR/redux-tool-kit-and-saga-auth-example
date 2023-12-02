export interface User {
    token: string
}

export interface UserSchema {
    authData?: User
    isLoading?: boolean
    error?: string
    _inited: boolean
}

export interface Post {
    id: string
    title: string
    content: string
}

export interface PostsSchema {
    posts?: Array<Post>
    isLoading?: boolean
    error?: string
}
