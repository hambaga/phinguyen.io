const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateWebpackConfig = ({getConfig, stage}) => {
  const config = getConfig();
  if (stage.startsWith('develop') && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-dom': '@hot-loader/react-dom'
    }
  }
};

exports.onCreateNode = ({node, getNode, actions}) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({node, getNode, basePath: `pages`});
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

exports.createPages = ({actions, graphql}) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve('./src/templates/BlogPost/BlogPost.tsx');
  return new Promise((resolve, reject) => {
    resolve(graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
              fields{
                  slug
              }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
        if (result.errors) {
          console.log(result.errors);
          return reject(result.errors);
        }
        const blogTemplate = path.resolve('./src/templates/BlogPost/BlogPost.tsx');
        result.data.allMarkdownRemark.edges.forEach(({node}) => {
          createPage({
            path: node.fields.slug,
            component: blogTemplate,
            context: {
              slug: node.fields.slug,
            }, // additional data can be passed via context
          })
        });
      })
    )
  })
};