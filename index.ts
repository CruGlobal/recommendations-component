interface Recommendation {
  title: string;
  category: string;
  uri: string;
  imageUri: string;
}

const recommendations: Recommendation[] = [
  {
    title: 'Test',
    category: 'Fasting',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/300x200',
  },
  {
    title: 'Second Test',
    category: 'Fasting',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/400',
  },
  {
    title: 'Third Test',
    category: 'Fasting',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/150',
  },
];

interface CssClasses {
  wrapper: string;
  header: string;
  card: string;
  image: string;
  category: string;
  title: string;
}

const classPrefix = 'cru-recommendations-component';

const defaultClasses: CssClasses = {
  wrapper: classPrefix,
  header: `${classPrefix}-header`,
  card: `${classPrefix}-card`,
  image: `${classPrefix}-image`,
  category: `${classPrefix}-category`,
  title: `${classPrefix}-title`,
};

export const recommendationsToHTML = (
  recommendations: Recommendation[],
  classes: CssClasses,
) => `
<div class="${classes.wrapper}">
  <h1 class="${classes.header}">Recommended Articles</h1>
${recommendations.reduce(
  (output, { title, category, uri, imageUri }, index) =>
    `${output}
    
  <a href="${uri}" class="${classes.card}" id="${classPrefix}-recommendation-${
      index + 1
    }" onclick="window.dataLayer?.push({ event:'recommendation-click', recommendationNumber: ${
      index + 1
    }, recommendationImageUri: '${imageUri}', recommendationTitle: '${title}' })">
    <img src="${imageUri}" class="${classes.image}" />
    <h2 class="${classes.category}">${category}</h2>
    <h3 class="${classes.title}">${title}</h3>
  </a>`,
  '',
)}
</div>
`;

export const cruRecommendationsComponent = {
  render: (container: Element, customClasses?: Partial<CssClasses>) => {
    container.innerHTML = recommendationsToHTML(recommendations, {
      ...defaultClasses,
      ...customClasses,
    });
  },
};

declare global {
  interface Window {
    cruRecommendationsComponent: typeof cruRecommendationsComponent;
  }
}

window.cruRecommendationsComponent = cruRecommendationsComponent;
