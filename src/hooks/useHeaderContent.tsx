import { useCallback, useContext, useEffect, useState } from "react";

import { HeaderContentContext } from "../contexts";

export default function useHeaderContent() {
  const { content, setContent } = useContext(HeaderContentContext);
  const [defaultContent, setDefaultContent] = useState<React.ReactNode>(null);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
  }, [defaultContent, setContent]);

  useEffect(() => {
    resetContent();
  }, [resetContent]);

  return { content, setContent, resetContent, setDefaultContent };
}
