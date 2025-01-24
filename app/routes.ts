import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/quotations", "routes/quotations.tsx"),
  route("/quotations/:number", "routes/quotation-by-number.tsx"),
  route("/quotations/:number/duplicate", "routes/duplicate-quotation.tsx"),
] satisfies RouteConfig;
