import * as antd from "antd";
import * as antdIcon from "@ant-design/icons";
import { Column } from "@ant-design/plots";

const antdClone: any = antd;
Object.assign(antdClone, antdIcon, { Column }, {a: 111});

export default antdClone;
