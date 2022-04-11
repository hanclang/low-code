import Col from "./Col";
import Row from "./Row";

export default {
  ...Row,
  title: "4列栅格",
  childrens: [
    {
      ...Col,
      props: {
        span: 6,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 6,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 6,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 6,
        style: {
          minHeight: 30,
        },
      },
    },
  ],
};
