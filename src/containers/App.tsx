import React, { useRef, useContext, useEffect } from 'react';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import { arrayHaveInvalidUrl, selectText, selectLineTextArea } from '../utils';
import { useToast } from '../hooks/useToast';
import { SettingsContext } from '../contexts/SettingsContext';
import { useUrls } from '../hooks/useUrls';

function App(): JSX.Element {
  // this ref is needed for the text selection in the decoded URLs textarea
  const decodedUrlsElementRef: React.RefObject<HTMLTextAreaElement> = useRef<HTMLTextAreaElement>(
    null
  );

  const { decodedUrls, updateUrls, urlsToDecode, clearStorageUrls } = useUrls();
  const { showToast } = useToast();
  const { copyValue, trimValue } = useContext(SettingsContext);

  useEffect(() => {
    updateUrls(urlsToDecode, trimValue);
    // todo: meed to check this disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trimValue]);

  function toast({ caption = '', description = '', hasError = false }) {
    if (decodedUrls && arrayHaveInvalidUrl(decodedUrls)) {
      showToast({
        caption: 'One or more URLs are invalid!',
        description: 'Please check that you use the whole URL',
        hasError: true,
      });
    }

    if (!description?.length) {
      return;
    }

    showToast({
      caption,
      description,
      hasError,
    });
  }

  function handleOnChangeURLsToDecode(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    const onChangeUrlsToDecode: string[] = event.target.value.split('\n');
    updateUrls(onChangeUrlsToDecode, trimValue);
  }

  async function handleClickedCopiedDecodedUrls(): Promise<void> {
    if (!decodedUrls.length) {
      toast({
        caption: 'Failed to copy to decoded URLs',
        description: 'You have to decode at least one URL',
        hasError: true,
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(decodedUrls.join('\n'));

      toast({
        description: 'The decoded URLs copied to your clipboard',
      });
      if (decodedUrlsElementRef.current) {
        selectText(decodedUrlsElementRef.current);
      }
    } catch (error) {
      toast({
        description: 'Failed to copy the decoded URLs',
        hasError: true,
      });
      console.error(
        `Failed to copy - '${decodedUrls}' to the clipboard!\n${error}`
      );
    }
  }

  return (
    <>
      {/* TODO: only for debugging, should be removed later */}
      {copyValue}
      <br />
      {trimValue}
      <div className="flex flex-col justify-center items-center my-5 w-full">
        <TextArea
          textareaPlaceholder="Enter one or more URLs to decode"
          handleOnChange={handleOnChangeURLsToDecode}
          value={urlsToDecode}
        />
        <TextArea
          textareaPlaceholder="Decoded URLs"
          value={decodedUrls}
          readonly={true}
          doubleClick={selectLineTextArea}
          ref={decodedUrlsElementRef}
        />
      </div>
      <div className="flex justify-center items-center">
        <Button clicked={handleClickedCopiedDecodedUrls}>
          Copy all decoded URLs
        </Button>
        <Button clicked={clearStorageUrls}>Clear URLs</Button>
      </div>
    </>
  );
}

export default App;
