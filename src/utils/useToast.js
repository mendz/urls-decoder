import toast, { CheckmarkIcon, ErrorIcon, LoaderIcon } from 'react-hot-toast';
import { ReactComponent as CloseIcon } from '../assets/close.svg';

// add tailwind properties variables in order to overwrite goober react-hot-toast styles
// which in the build is under the linked stylesheet in the header
export function useToast() {
  function getDetails(hasError) {
    let icon = <LoaderIcon />;
    let classes = '';
    if (hasError) {
      icon = (
        <ErrorIcon
          className="bg-rose-400 toast--icon"
          style={{ background: 'var(--color-warning)' }}
        />
      );
      classes = 'bg-red-500';
    } else {
      icon = (
        <CheckmarkIcon
          className="bg-green-400 toast--icon"
          style={{ background: 'var(--color-success)' }}
        />
      );
      classes = 'bg-teal-500';
    }
    return {
      icon,
      classes,
    };
  }

  function showToast({ caption, description, hasError }) {
    const { icon, classes } = getDetails(hasError);
    const error = hasError ? 'ERROR: ' : '';
    toast(
      (t) => (
        <div className="relative" onClick={() => toast.dismiss(t.id)}>
          {caption && (
            <h3 className="text-sm">
              <span className="font-semibold">{error}</span>
              {caption}
            </h3>
          )}
          <p>{description}</p>
          <button
            className="absolute -top-5 -right-6 text-warmGray-100 h6 w-6"
            onClick={() => toast.dismiss(t.id)}
          >
            <CloseIcon />
          </button>
        </div>
      ),
      {
        icon,
        className: `text-white toast ${classes}`,
        style: {
          background: `var(${
            hasError ? '--color-warning' : '--color-success'
          })`,
          color: 'var(--color-text)',
        },
      }
    );
  }

  return { showToast };
}
