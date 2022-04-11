import Col from "./Col";
import Row from "./Row";

export default {
  ...Row,
  title: "2列栅格",
  childrens: [
    {
      ...Col,
      props: {
        span: 4,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 20,
        style: {
          minHeight: 30,
        },
      },
    },
  ],
};
