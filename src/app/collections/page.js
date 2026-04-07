import CollectionList from "../components/CollectionList"
import { fetchCollections } from "../lib/sanity"

const page = async () => {
  const collections = await fetchCollections()
  
  return (
    <div className="mt-6">
        <CollectionList collections={collections}/>
    </div>
  )
}
export default page