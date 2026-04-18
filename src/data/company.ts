import jermainePhoto from "@/assets/team-jermaine.jpg";
import sidneiPhoto from "@/assets/team-sidnei.jpg";
import bogdanPhoto from "@/assets/team-bogdan.jpg";

export type Member = {
  name: string;
  role: string;
  bio?: string;
  initials: string;
  photo?: string;
  linkedin?: string;
};

export const TEAM: Member[] = [
  {
    name: "Jermaine J.",
    role: "Chief Executive Officer",
    initials: "JJ",
    photo: jermainePhoto,
    linkedin: "https://www.linkedin.com/in/jermaine-johnson-093894b9/",
  },
  {
    name: "Sidnei A.",
    role: "Chief Technology Officer",
    initials: "SA",
    photo: sidneiPhoto,
    linkedin: "https://www.linkedin.com/in/sidnei-andr%C3%A9-720956171/",
  },
  {
    name: "Bogdan K.",
    role: "Tech Lead",
    initials: "BK",
    photo: bogdanPhoto,
    linkedin: "https://www.linkedin.com/in/bogdan-kaminskyi-69b5623b8/",
  },
];

export const COMPANY_LOCATION = {
  name: "BlockTerraLab HQ",
  address: "1208 2nd Avenue, Seattle, WA 98101",
  // Seattle downtown bounding box (left, bottom, right, top), marker lat/lon
  lat: 47.6079,
  lon: -122.3375,
};
