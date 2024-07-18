import img1 from "./people/img1.png";
import img2 from "./people/img2.png";
import img3 from "./people/img3.png";
import img4 from "./people/img4.png";
import img5 from "./people/img5.png";
import img6 from "./people/img6.png";
import img7 from "./people/img7.png";
import img8 from "./people/img8.png";
import img9 from "./people/img9.png";
import img10 from "./people/img10.png";
import img11 from "./people/img11.png";
import img12 from "./people/img12.png";
import img13 from "./people/img13.png";
import img14 from "./people/img14.png";
import img15 from "./people/img15.png";
import img16 from "./people/img16.png";
import img17 from "./people/img17.png";
import img18 from "./people/img18.png";
import img19 from "./people/img19.png";
import img20 from "./people/img20.png";
import img21 from "./people/img21.png";
import img22 from "./people/img22.png";
import img23 from "./people/img23.png";
import img24 from "./people/img24.png";
import img25 from "./people/img25.png";
import img26 from "./people/img26.png";
import img27 from "./people/img27.png";
import img28 from "./people/img28.png";
import img29 from "./people/img29.png";
import img30 from "./people/img30.png";
import img31 from "./people/img31.png";
import img32 from "./people/img32.png";
import img33 from "./people/img33.png";
import img34 from "./people/img34.png";
import img35 from "./people/img35.png";
import img36 from "./people/img36.png";
import img37 from "./people/img37.png";
import img38 from "./people/img38.png";
import img39 from "./people/img39.png";
import img40 from "./people/img40.png";
import img41 from "./people/img41.png";
import img42 from "./people/img42.png";
import img43 from "./people/img43.png";
import img44 from "./people/img44.png";
import img45 from "./people/img45.png";
import img46 from "./people/img46.png";
import img47 from "./people/img47.png";
import img48 from "./people/img48.png";
import img49 from "./people/img49.png";
import img50 from "./people/img50.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27, img28, img29, img30, img31, img32, img33, img34, img35, img36, img37, img38, img39, img40, img41, img42, img43, img44, img45, img46, img47, img48, img49, img50];
const names =["Emma", "Liam", "Olivia", "Noah", "Ava", "Elijah", "Sophia", "Oliver", "Isabella", "Mason", "Mia", "Logan", "Amelia", "James", "Charlotte", "Aiden", "Harper", "Ethan", "Evelyn", "Lucas", "Abigail", "Jackson", "Emily", "Alexander", "Madison", "Sebastian", "Aubrey", "Jacob", "Lily", "Michael", "Ella", "Benjamin", "Chloe", "Carter", "Grace", "William", "Scarlett", "Owen", "Sofia", "Daniel", "Avery", "Luke", "Mila", "Henry", "Ella", "Gabriel", "Layla", "Matthew", "Riley", "Anthony"];

const allJobSeek = images.map((img, index) => ({
    id: `jobseek${index + 1}`,
    name: names[index],
    avatar: img
}));

export function getAlJoobSeek() {
    return allJobSeek;
  }

  export function getCompanyById(id) {
    return allJobSeek.find((event) => event.id === id);
  }
