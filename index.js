//@ts-check
module.exports = (app) => {
  app.log.info('Bot started');

  app.on('issues.opened', async (context) => {
    const labels = context.payload.issue.labels;
    if (labels && labels.length <= 0) {
      const owner = context.payload.repository.owner.login;
      const repo = context.payload.repository.name;
      const issueNumber = context.payload.issue.id;
      app.log.info('%s/%s#%d is being closed', owner, repo, issueNumber);
      await context.octokit.issues.createComment(context.issue({ body: `Please use a [template](https://github.com/${owner}/${repo}/issues/new/choose) when creating an issue.` }));
      await context.octokit.issues.setLabels(context.issue({ labels: ['invalid'] }));
      return context.octokit.issues.update(context.issue({ state: 'closed' }));
    }
  });
};