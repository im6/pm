import type { Metadata } from "next";
import DupClient from "./DupClient";

const DupHome = () => <DupClient />;
export default DupHome;
export const metadata: Metadata = {
  title: "Dup",
};
