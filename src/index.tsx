import { createRoot } from 'react-dom/client';
import { TimelineBlock } from './components/TimelineBlock/TimelineBlock';
import { slices } from './data';

import './styles/_variables.scss'; 

createRoot(document.getElementById('root')!).render(
  <>
    <TimelineBlock slices={slices} />
  </>
);
