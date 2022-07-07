const mainPageCategoryList = [
  {
    name: "포인트",
    imgSrc: "/asset/img/point.png",
    alt: "point icon",
  },
  {
    name: "쿠폰함",
    imgSrc: "/asset/img/coupon.png",
    alt: "coupon icon",
  },
  {
    name: "선물함",
    imgSrc: "/asset/img/present.png",
    alt: "present icon",
  },
  {
    name: "찜",
    imgSrc: "/asset/img/cart.png",
    alt: "cart icon",
  },
  {
    name: "주문내역",
    imgSrc: "/asset/img/order.png",
    alt: "order icon",
  },
  {
    name: "리뷰관리",
    imgSrc: "/asset/img/review.png",
    alt: "review icon",
  },
];

const mainPageMenuList = [
  {
    title: "배민페이 등록",
    isNew: true,
    description: "배민페이로 결제하면 최대 5.5% 배민포인트가 적립됩니다!",
  },
  {
    title: "가족계정 관리",
    isNew: true,
    description: "결제수단을 공유해 우리 가족의 끼니를 챙겨주세요.",
  },
  {
    title: "공지사항",
    isNew: false,
  },
  {
    title: "배민커넥트 지원",
    isNew: false,
  },
];

module.exports = { mainPageCategoryList, mainPageMenuList };
