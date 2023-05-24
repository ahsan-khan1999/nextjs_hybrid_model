import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
  console.log(blogs);
  return (
    <main>
      <p>{blogs?.title}</p>
    </main>
  );
}

export async function getStaticPaths() {
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
  //   const paths = ["6433e58420a7f2e6f2689f18", "6433e54f20a7f2e6f2689f14"];
  const posts = await res.json();
  //   console.log(posts,"posts");
  // Get the paths we want to pre-render based on posts
  const paths = posts?.data?.Blog?.map((post) => ({
    params: { id: post.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
export async function getStaticProps({ params }) {
  let BASEURL = "";

  let reqUrlBlog = BASEURL + `/blog/${params.id}`;

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
  console.log(params);
  const blog = await res.json();
  const blogs = blog?.data?.Blog;

  return {
    props: {
      blogs,
    }, // will be passed to the page component as props
  };
}
