import Col from "./Col";
import Row from "./Row";

export default {
  ...Row,
  title: "8列栅格",
  childrens: [
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
    {
      ...Col,
      props: {
        span: 3,
        style: {
          minHeight: 30,
        },
      },
    },
  ],
};
