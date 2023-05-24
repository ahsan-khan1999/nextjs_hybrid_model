import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <main>
      {blogs?.map((item) => (
        <Link href={`/blog/${item.id}`}>{item?.title}</Link>
      ))}
    </main>
  );
}

export async function getStaticProps(context) {
  let BASEURL = "";

  let reqUrlBlog = BASEURL + `/blog?size=1000`;

  const res = await fetch(reqUrlBlog, {
    mode: "cors",
    method: "GET",
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/plain",
      "X-My-Custom-Header": "value-v",
      lang: "en",
    }),
  });

  const blog = await res.json();
  const blogs = blog?.data?.Blog;

  return {
    props: {
      blogs,
    }, // will be passed to the page component as props
  };
}
