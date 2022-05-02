import * as antd from "antd";
import * as antdIcon from "@ant-design/icons";
import { Column, Line } from "@ant-design/plots";

const antdClone: any = antd;
Object.assign(antdClone, antdIcon, { Column, Line }, {a: 111});

export default antdClone;
