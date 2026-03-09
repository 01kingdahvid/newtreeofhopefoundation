import ProgramGallerySlider from '../ProgramDetail/ProgramGallerySlider/ProgramGallerySlider';
import styles from './op.module.css';


export default function Gallery({ images }) {
  return (
    <section className={styles.gallery}>
      <div className={styles.galleryContainer}>
        <h2>Impact In Action</h2>
        <p>See how your support transforms lives</p>
        <ProgramGallerySlider images={images} />
      </div>
    </section>
  );
}
