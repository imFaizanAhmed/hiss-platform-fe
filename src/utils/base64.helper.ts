export const getFileType = (base64String: string) => {
  const match: RegExpMatchArray | null = base64String.match(
    /^data:([a-z]+\/[a-z0-9-+.]+);base64,.*/
  );

  if (match) {
    const mimeType = match[1];
    return mimeType;
  } else {
    return null;
  }
};
