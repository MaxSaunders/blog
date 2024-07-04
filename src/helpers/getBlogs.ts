// export const getBlogPosts = async () => {
//     const result = []
//     const dir = path.join(process.cwd(), "./content/posts")
//     const blogPosts = await fs.readdir(dir)

//     await Promise.all(
//         blogPosts.map(async (post) => {
//             const postPath = path.join(dir, post)
//             const slug = post.replace(".md", "")
//             const fileContent = await fs.readFile(postPath, "utf8")

//             const { text: timeToRead } = readingTime(fileContent)

//             const {
//                 data: { title, date, thumbnail, tag },
//             } = matter(fileContent)

//             result.push({
//                 title,
//                 date,
//                 slug,
//                 thumbnail,
//                 timeToRead,
//                 tag,
//                 fileContent,
//             })
//         })
//     )

//     return result.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
// }
