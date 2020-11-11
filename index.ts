interface Recommendation {
  title: string;
  description: string;
  uri: string;
  imageUri: string;
}

const recommendations: Recommendation[] = [
  {
    title: 'Test',
    description: 'Some description',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/150',
  },
  {
    title: 'Second Test',
    description: 'Some description',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/150',
  },
  {
    title: 'Third Test',
    description: 'Some description',
    uri: 'https://cru.org',
    imageUri: 'https://via.placeholder.com/150',
  },
];

interface CssClasses {
  wrapper: string;
  card: string;
  image: string;
  title: string;
  description: string;
}

const classPrefix = 'cru-recommendations-component';

const defaultClasses: CssClasses = {
  wrapper: classPrefix,
  card: `${classPrefix}-card`,
  image: `${classPrefix}-image`,
  title: `${classPrefix}-title`,
  description: `${classPrefix}-description`,
};

export const recommendationsToHTML = (
  recommendations: Recommendation[],
  classes: CssClasses,
) => `
<div class="${classes.wrapper}">
${recommendations.reduce(
  (output, { title, description, uri, imageUri }) =>
    `${output}
    
  <a href="${uri}" class="${classes.card}">
    <img src="${imageUri}" class="${classes.image}" />
    <h2 class="${classes.title}">${title}</h1>
    <p class="${classes.description}">${description}</p>
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
