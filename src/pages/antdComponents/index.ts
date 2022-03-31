import * as antd from "antd";

const antdClone: any = antd;
Object.assign(antdClone, {a: 111});

export default antdClone;
