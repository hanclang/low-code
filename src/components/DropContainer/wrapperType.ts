/**
 * 是否需要包裹一层div
 * @param type
 * @returns
 */
export default function needWrapper(type: string): Record<string, any> {
  const types = [
    "Checkbox",
    "Calendar",
    "Pagination",
    "DatePicker",
    "Table",
    "Carousel",
    "Radio.Group",
    "PageHeader",
    "Steps",
    "Column"
  ];

  const isInlineType = ["Table", "Carousel", "PageHeader", "Steps", "Column"]; // 不需要inline-block

  return {
    isWrapper: types.includes(type),
    isInline: !isInlineType.includes(type),
  };
}
