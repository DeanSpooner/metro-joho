export function getLastSegment(input: string): string {
  return input.split(".").pop() || "";
}
