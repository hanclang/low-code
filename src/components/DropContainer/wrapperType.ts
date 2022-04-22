/**
 * 是否需要包裹一层div
 * @param type
 * @returns
 */
export default function needWrapper(type: string): Record<string, any> {
  const types = ["Calendar", "Pagination", "DatePicker", "Table"];

  return {
    isWrapper: types.includes(type),
    isInline:  type !== "Table",
  };
}
