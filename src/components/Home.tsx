import { Card, Loader, Text, spacing } from '@gravity-ui/uikit'
import { useAppSelector } from '../redux/hooks'
import {
    selectPostData,
    selectPostError,
    selectPostLoading,
} from '../redux/selectors'
import { Post } from '../redux/types'

export const Home = () => {
    const posts = useAppSelector(selectPostData)
    const isPostLoading = useAppSelector(selectPostLoading)
    const postsError = useAppSelector(selectPostError)

    return (
        <>
            <h2>Home (Public)</h2>
            {postsError && (
                <Text
                    className={`${spacing({ mb: 4 })}`}
                    color="danger-heavy"
                    variant="body-3"
                >
                    Произошла ошибка при попытке загрузить посты
                </Text>
            )}
            {isPostLoading && <Loader size="s" />}
            {posts &&
                posts?.length > 0 &&
                posts?.map((post: Post) => (
                    <Card
                        className={`${spacing({ mb: 5 })} post-item`}
                        theme="normal"
                        key={post.id}
                    >
                        <Text
                            className={`${spacing({ mb: 3 })} post-title`}
                            variant="header-2"
                        >
                            {post.title}
                        </Text>
                        <Text variant="body-3" className="post-content">
                            {post.content}
                        </Text>
                    </Card>
                ))}
        </>
    )
}
