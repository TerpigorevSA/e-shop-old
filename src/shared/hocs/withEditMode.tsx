import React, { ComponentType } from 'react';
import style from './withEditMode.module.css';

function withEditMode<P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P & { onEdit: () => void }> {
  const ComponentWithEditMode = (props: P & { onEdit: () => void }) => {
    const { onEdit, ...rest } = props;

    return (
      <div className={style.editWrapper}>
        <WrappedComponent {...(rest as P)} />
        <button className={style.editButton} onClick={onEdit}>
          Edit
        </button>
      </div>
    );
  };

  ComponentWithEditMode.displayName = `withEditMode(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithEditMode;
}

export default withEditMode;
