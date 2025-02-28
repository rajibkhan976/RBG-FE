# GIT Process [V1.0.0]

## 1. **The main branches**

At the core, the development model is greatly inspired by existing models out there. The central repo holds two main branches with an infinite lifetime:

* master
* develop

The `master` branch at `origin` should be familiar to every Git user. Parallel to the `master` branch, another branch exists called `develop`.

We consider `origin/master` to be the main branch where the source code of **HEAD** always reflects a *production-ready* state.

We consider `origin/develop` to be the main branch where the source code of **HEAD** always reflects a state with the latest delivered development changes for the next release. Some would call this the “integration branch”. This is where any automatic nightly builds are built from.

When the source code in the `develop` branch reaches a stable point and is ready to be released, all of the changes should be merged back into master somehow and then tagged with a release number. How this is done in detail will be discussed further on.

Therefore, each time when changes are merged back into master, this is a new production release *by definition*. We tend to be very strict at this, so that theoretically, we could use a Git hook script to automatically build and roll-out our software to our production servers everytime there was a commit on `master`.

## 2. **Supporting branches**

Next to the main branches `master` and `develop`, our development model uses a variety of supporting branches to aid parallel development between team members, ease tracking of features, prepare for production releases and to assist in quickly fixing live production problems. Unlike the main branches, these branches always have a limited life time, since they will be removed eventually.

The different types of branches we may use are:

* Feature branches
* Release branches
* Hotfix branches

Each of these branches have a specific purpose and are bound to strict rules as to which branches may be their originating branch and which branches must be their merge targets.

## 3. **Feature branches**

May branch off from:

* **develop**

Must merge back into:

* **develop**

Branch naming convention:

* anything except **master**, **develop**, **release-\***, or **hotfix-\*** but recommended **feature-\***

Feature branches (or sometimes called topic branches) are used to develop new features for the upcoming or a distant future release. When starting development of a feature, the target release in which this feature will be incorporated may well be unknown at that point. The essence of a feature branch is that it exists as long as the feature is in development, but will eventually be merged back into `develop` (to definitely add the new feature to the upcoming release) or discarded (in case of a disappointing experiment).

Feature branches typically exist in developer repositories only, not in origin.

### 3.1 **Creating a feature branch**

When starting work on a new feature, branch off from the `develop` branch.

```bash
$ git checkout -b feature-user-1.0.0 develop
# Switched to a new branch "feature-user-1.0.0"
```

### 3.2 **Incorporating a finished feature on develop**

Finished features may be merged into the `develop` branch to definitely add them to the upcoming release:

```bash
$ git checkout develop
# Switched to branch 'develop'
$ git pull origin develop
# Pull the latest commits
$ git merge --squash feature-user-1.0.0
# Squash all commits 
$ git commit -m "{Feature name} {Feature version} released"
# Make a commit
$ git push origin develop
# Push the latest commits to the repository
```

## 4. **Release branches**

May branch off from:

* **develop**

Must merge back into:

* **develop** and **master**

Branch naming convention:

* **release-\***

Release branches support preparation of a new production release. They allow for last-minute dotting of i’s and crossing t’s. Furthermore, they allow for minor bug fixes and preparing meta-data for a release (version number, build dates, etc.). By doing all of this work on a release branch, the `develop` branch is cleared to receive features for the next big release.

The key moment to branch off a new release branch from develop is when develop (almost) reflects the desired state of the new release. At least all features that are targeted for the release-to-be-built must be merged in to `develop` at this point in time. All features targeted at future releases may not—they must wait until after the release branch is branched off.

It is exactly at the start of a release branch that the upcoming release gets assigned a version number—not any earlier. Up until that moment, the `develop` branch reflected changes for the “next release”, but it is unclear whether that “next release” will eventually become 0.3 or 1.0, until the release branch is started. That decision is made on the start of the release branch and is carried out by the project’s rules on version number bumping.

### 4.1 **Creating a release branch**

Release branches are created from the develop branch. For example, say version 1.1.5 is the current production release and we have a big release coming up. The state of develop is ready for the “next release” and we have decided that this will become version 1.2 (rather than 1.1.6 or 2.0). So we branch off and give the release branch a name reflecting the new version number:

```bash
$ git checkout -b release-1.2 develop
# Switched to a new branch "release-1.2" from develop
```

This new branch may exist there for a while, until the release may be rolled out definitely. During that time, bug fixes may be applied in this branch (rather than on the develop branch). Adding large new features here is strictly prohibited. They must be merged into develop, and therefore, wait for the next big release.

### 4.2 **Finishing a release branch**

When the state of the release branch is ready to become a real release, some actions need to be carried out. First, the release branch is merged into `master` (since every commit on `master` is a new release by definition, remember). Next, that commit on master must be tagged for easy future reference to this historical version. Finally, the changes made on the release branch need to be merged back into `develop`, so that future releases also contain these bug fixes.

```bash
# Please make sure you have updated the release note putting your feature latest version and what's new
$ git checkout master
# Switched to branch 'master'
$ git pull origin master
# Pull the latest commits
$ git merge --squash release-1.2
# Squash all commits 
$ git commit -m "RELEASE: {Release version} released to production"
# Make a commit
$ git tag -a v1.2
# Add a tag for current release in current branch
$ git push origin master --tags
# Push the latest commits to the repository with all tags created

# OR 

$ git checkout master
# Switched to branch 'master'
$ git pull origin master
# Pull the latest commits
$ git commit -am "Prepare"
# Update the release note and then make a prepare commit
$ git merge release-1.2
# Merge release-1.2
$ git reset --soft {HEAD~prepare commit}
# Do a soft reset taking the commit ID of prepare commit
$ git commit --amend -m "RELEASE: {Release version} released to production"
# Amend all the newly created commits into a single commit 
$ git tag -a v1.2
# Add a tag for current release in current branch
$ git push origin master --tags
# Push the latest commits to the repository with all tags created
```

To keep the changes made in the `release` branch, we need to merge those back into `develop`, though. In Git:

```bash
$ git checkout develop
# Switched to branch 'develop'
$ git merge release-1.2
```

This step may well lead to a merge conflict (probably even, since we have changed the version number). If so, fix it and commit.

Now we are really done and the release branch may be removed, since we don’t need it anymore:

```bash
$ git branch -d release-1.2
# Deleted branch release-1.2
```

## 5.0 **Hotfix branches**

May branch off from:

* **master**

Must merge back into:

* **develop** and **master**

Branch naming convention:

* **hotfix-\***

Hotfix branches are very much like release branches in that they are also meant to prepare for a new production release, albeit unplanned. They arise from the necessity to act immediately upon an undesired state of a live production version. When a critical bug in a production version must be resolved immediately, a hotfix branch may be branched off from the corresponding tag on the master branch that marks the production version.

The essence is that work of team members (on the `develop` branch) can continue, while another person is preparing a quick production fix.

### 5.1 **Creating the hotfix branch**

Hotfix branches are created from the `master` branch. For example, say version 1.2 is the current production release running live and causing troubles due to a severe bug. But changes on `develop` are yet unstable. We may then branch off a hotfix branch and start fixing the problem:

```bash
$ git checkout -b hotfix-1.2.1 master
# Switched to a new branch "hotfix-1.2.1"
$ git commit -am "HOTFIX: {Release version} released to production"
```

### 5.2 **Finishing a hotfix branch**

When finished, the bugfix needs to be merged back into master, but also needs to be merged back into develop, in order to safeguard that the bugfix is included in the next release as well. This is completely similar to how release branches are finished.

```bash
$ git checkout master
# Switched to branch 'master'
$ git merge hotfix-1.2.1
# Merge hotfix-1.2.1
$ git tag -a 1.2.1
```

Next, include the bugfix in `develop`, too:

```bash
$ git checkout develop
# Switched to branch 'develop'
$ git merge hotfix-1.2.1
# Merge hotfix-1.2.1
```

The one exception to the rule here is that, **when a release branch currently exists, the hotfix changes need to be merged into that release branch, instead of** `develop`. Back-merging the bugfix into the release branch will eventually result in the bugfix being merged into `develop` too, when the release branch is finished. (If work in `develop` immediately requires this bugfix and cannot wait for the release branch to be finished, you may safely merge the bugfix into `develop` now already as well.)

Finally, remove the temporary branch:

```bash
$ git branch -d hotfix-1.2.1
# Deleted branch hotfix-1.2.1
```

## 6. **Workflow diagram**

![GIT Process Diagram](/docs/images/git-model@2x.png)

## 7. **Content source**

[Here](https://nvie.com/posts/a-successful-git-branching-model/) is the original source from where contents have been taken.

Happy Coding :slightly_smiling_face:
