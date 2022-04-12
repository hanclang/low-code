import * as antd from "antd";
import * as antdIcon from "@ant-design/icons";

const antdClone: any = antd;
Object.assign(antdClone, antdIcon, {a: 111});

export default antdClone;
