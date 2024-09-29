

import Header from '@/components/Header/Header';
import Resource from '@/components/Resource/Resource';
import Footer from '@/components/Footer/Footer';
import { getAllResourcesID, googleDocsGet } from '../../../lib/resource';

export default async function Post({params}) {
  const data = await getPosts(params.id)
  return (
    <main class="flex flex-col h-dvh relative">
    <Header/>
    <Resource class="dark:text-dark" key={data.postData.id} item={data.postData}/>
    <Footer/>
  </main>
  )
}

export async function generateStaticParams() {
  const posts = await getAllResourcesID('1Z3iLf79gKWsyFVqEh1xAyUUuz4gRAozI')
  return (posts.map((post) => ({
    id: post.params.documentId,
  })))
}

async function getPosts(id) {
  const postData = await googleDocsGet(id);
  return {
      postData,
    };
}