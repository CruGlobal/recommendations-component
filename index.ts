interface Recommendation {
  uri: string;
  title: string;
  imageUri: string;
  category: string;
}

const apiUri = 'https://cru-content-based-filtering.s3.amazonaws.com/';

interface CssClasses {
  wrapper: string;
  header: string;
  card: string;
  image: string;
  category: string;
  title: string;
}

const classPrefix = 'cru-recommendations-component';

const defaultClassNames: CssClasses = {
  wrapper: classPrefix,
  header: `${classPrefix}-header`,
  card: `${classPrefix}-card`,
  image: `${classPrefix}-image`,
  category: `${classPrefix}-category`,
  title: `${classPrefix}-title`,
};

const recommendationsToHTML = (
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
    <img src="${imageUri}" class="${classes.image}" alt="${title}" />
    <h2 class="${classes.category}">${category}</h2>
    <h3 class="${classes.title}">${title}</h3>
  </a>`,
  '',
)}
</div>
`;

export const cruRecommendationsComponent = {
  render: async (
    container: Element,
    {
      uri = window.location.href,
      classNames,
    }: { uri?: string; classNames?: Partial<CssClasses> } = {},
  ) => {
    try {
      const response = await fetch(`${apiUri}${encodeURIComponent(uri)}.json`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const recommendations: Recommendation[] = await response.json();
      container.innerHTML = recommendationsToHTML(recommendations, {
        ...defaultClassNames,
        ...classNames,
      });
    } catch (error) {
      throw new Error(`Error loading/rendering recommendations: ${error}`);
    }
  },
};

declare global {
  interface Window {
    cruRecommendationsComponent: typeof cruRecommendationsComponent;
  }
}

window.cruRecommendationsComponent = cruRecommendationsComponent;
