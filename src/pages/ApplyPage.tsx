import { Navigate, useParams } from "react-router-dom";
import { getTalentBySlug } from "@/data/talents";

/** Deep links to /talents/:slug/apply open the in-page application overlay on the role page. */
const ApplyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const talent = slug ? getTalentBySlug(slug) : undefined;
  if (!talent) return <Navigate to="/" replace />;
  return <Navigate to={`/talents/${talent.slug}?apply=1`} replace />;
};

export default ApplyPage;
