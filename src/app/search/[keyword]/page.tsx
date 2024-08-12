import { searchPm } from "@/utils/search";
import PmTable from "../../../components/PmTable/index";
import { extractPubSeq } from "@/utils/scan";

const Search = async ({ params }: { params: { keyword: string } }) => {
  const updateSearch = extractPubSeq(params.keyword);
  const c = searchPm(`${updateSearch[0]}${updateSearch[1]}`);

  if (!c || !Array.isArray(c.p)) {
    return <p>No results</p>;
  }
  return <PmTable rows={c.p} />;
};

export default Search;
