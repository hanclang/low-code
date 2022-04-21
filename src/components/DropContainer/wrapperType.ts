/**
 * 是否需要包裹一层div
 * @param type
 * @returns
 */
export default function needWrapper(type: string): boolean {
  const types = ["Calendar", "Pagination", "DatePicker"];

  return types.includes(type);
}
