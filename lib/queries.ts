export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  title, slug, excerpt, publishedAt, featuredImage, category->{title, slug, color}, tags
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title, slug, excerpt, publishedAt, featuredImage, category->{title, slug, color}, tags, body, author->{name, bio, photo, social}
}`;
