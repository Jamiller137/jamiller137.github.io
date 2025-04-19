---
title: 'Implementing a Dev Branch'
date: 2025-4-19
draft: true
github_link: "https://github.com/gurusabarish/hugo-profile"
author: "Jacob Miller"
tags:
  - Git Repository
  - Organization
  - Workflow
description: "A breakdown of a common repository workflow."
---
I was recently asked to write up a proposal for a repository workflow. The 
result is in no way original but is a simplification of some of the branching
strategies found in 
[this article.](https://medium.com/novai-devops-101/top-4-branching-strategies-and-their-comparison-a-guide-with-recommendations-21071e1c472a)

## Common GitHub Workflow Problems

Many GitHub repositories have a simple workflow where contributors create
feature branches directly off `main` and eventually merge back into it. 
This is a nice solution for small or proof-of-concept projects where stable 
production level code is not life or death. However, as the code-base and
contributor size grows this strategy has challenges:

- **Stability risks**: Direct merges to `main` can and will introduce bugs to
production code
- **Integration issues**: Feature changes tested in isolation may conflict when 
combined
- **Contributor friction**: External contributors without write permissions
must fork, which creates a disjointed development experience over time
- **Unclear progression**: Without intermediate stages, the path from 
contribution to production is not clear

## The Dev Branch Solution

A dedicated dev branch creates a middle ground between initial development and 
production-ready code. Here's how this one simple trick can drastically 
improve one's workflow:

### Branch Structure
`feature branches` -> `dev` -> `main`

This creates a clear progression which quarantines unstable in-progress work 
from production code.

### Why This Works

- **Protected Production Environment**: The `main` branch remains stable with
an additional verification layer
- **Integration Testing**: The `dev` branch serves as a place to catch
conflicts between features
- **Cleaner Collaboration**: Work stays centralized rather than scattered 
across multiple forks
- **Contributor Progression**: Contributors can see a structured path to 
gaining increased project responsibility

These are extremely applicable for my current use case since academic software 
tends to have a consistent revolving door of contributors with varying levels
of experience/expertise.

## Implementing This Workflow

### For Core Team Members

1. Create feature branches from the dev branch:
   ```bash
   git switch dev
   git pull    # Keep dev updated
   git switch -c feature-name    # New branch based on dev
   ```
2. Develop and test your changes locally.
3. Push the feature branch to the repository:
    ```bash
    git push origin feature-name
    ```
4. Open a pull request to the `dev` branch (not `main`)... never touch `main`.
5. After review, repository administrators can merge a stable `dev` branch to
`main`.

### For External Contributors

People who aren't a part of the organization still have the option to fork the 
repository and submit pull requests as usual. The workflow for these
contributors should be similar:
1. Fork repository
2. Create a feature branch on their fork
3. Submit a pull request from the feature to the `dev` branch

### Branch Protection
To gain the benefits of this setup it is advisable to have the following
protection settings/policies:

#### Main Branch:

- Require code review approval before merging
- Restrict merge permissions solely to administrators
- Disable direct pushes (can only PR from `dev` to `main`)
- Require all tests and checks pass

#### Dev Branch:
- Disable direct pushes except in emergencies
    - All changes to `dev` should really be coming through PRs from 
    feature branches.
- Require tests and checks to pass
- Require review from an administrator or maintainer

### Permissions

This structure inherently creates a progression of responsibilty/trust:
- **Administrators**: Full repository control, are primarily responsible for
  `dev` -> `main` merges and can do basically anything they need to
- **Maintainers**: can approve PRs to `dev`, manage issues, can give preliminary
  code reviews
- **Developers**: Can create feature branches inside of the organization repository
  without the need to fork
- **Contributor**: Not a part of the organization or are required to fork and
  submit PRs from their feature branches to `dev`

This creates a natural advancement path:
1. New contributors start by forking and submitting PRs
2. After quality contributions, grant them direct repository access
3. As trust builds, they can become maintainers with review privileges
4. Eventually, trusted maintainers might become administrators

*"The Wheel of Time turns, and Ages come and pass, leaving memories that become
legend."*





