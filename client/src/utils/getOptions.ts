export default function getOptions(array: string[]) {
  return array.map((item) => ({
    value: item,
    label: item,
  }));
}
