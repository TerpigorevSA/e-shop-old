// import React, { ReactNode, useState } from 'react';
// import cn from 'clsx';
// import styles from './PageLayout.module.css';

// interface PageLayoutProps {
//     header: ReactNode;
//     footer: ReactNode;
//     sidebar: ReactNode;
//     children: ReactNode;
// }

// const PageLayout: React.FC<PageLayoutProps> = ({ header, footer, sidebar, children }) => {
//     const [isSidebarVisible, setSidebarVisible] = useState(true);

//     const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

//     return (
//         <div className={styles.wrapper}>
//             <header className={styles.header}>{header}</header>
//             <div className={styles.main}>
//                 <aside
//                     className={cn(styles.sidebar, { [styles.sidebarHidden]: !isSidebarVisible })}
//                 >
//                     <nav className={styles.sidebarContent}>{sidebar}</nav>
//                 </aside>
//                 <div className={cn(styles.toggler)}>
//                     <button onClick={toggleSidebar} className={styles.toggleButton}>
//                         {isSidebarVisible ? '<' : '>'}
//                     </button>
//                 </div>
//                 <main className={styles.content}>{children}</main>
//             </div>
//             <footer className={styles.footer}>{footer}</footer>
//         </div>
//     );
// };

// export default PageLayout;

import React, { useState } from 'react';
import styles from './PageLayout.module.css';
import cn from 'clsx';
import Button from '../Button/Button';

interface PageLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ header, footer, children, sidebar }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>{header}</header>
      <div className={styles.main}>
        <div className={cn(styles.sidebar, !isSidebarVisible && styles.hidden)}>
          <div className={cn(styles.sidebarContent)}>{sidebar}</div>
          {/* {isSidebarVisible && <div className={styles.sidebarContent}>{sidebar}</div>} */}
        </div>
        {/* <button className={styles.toggleButton} onClick={toggleSidebar}>
            {isSidebarVisible ? '<' : '>'}
          </button> */}
        <Button
          lable={isSidebarVisible ? '<' : '>'}
          className={styles.toggleButton}
          disabled={false}
          onClick={toggleSidebar}
          type="button"
        />
        <main className={styles.content}>{children}</main>
      </div>
      <footer className={styles.footer}>{footer}</footer>
    </div>
  );
};

export default PageLayout;
