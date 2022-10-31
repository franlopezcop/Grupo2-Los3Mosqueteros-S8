import ContentRowCenter from "./ContentRowCenter";
import ContentRowDb from "./ContentRowDb";
import Chart from "./Chart";

function ContentRowTop() {
  return (
    <>
      <ContentRowDb />
      <ContentRowCenter />
      <Chart />
    </>
  );
}
export default ContentRowTop;
