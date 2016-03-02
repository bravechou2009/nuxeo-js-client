'use strict';

import Nuxeo from './nuxeo';
import Base from './base';
import Operation from './operation';
import Request from './request';
import Repository from './repository';
import Document from './document';
import BatchUpload from './upload/batch';
import Blob from './blob';
import BatchBlob from './upload/blob';
import Users from './user/users';
import User from './user/user';
import Groups from './group/groups';
import Group from './group/group';
import Directory from './directory/directory';
import DirectoryEntry from './directory/entry';
import Workflows from './workflow/workflows';
import Workflow from './workflow/workflow';
import Task from './workflow/task';
import Promise from './deps/promise';

Nuxeo.Base = Base;
Nuxeo.Operation = Operation;
Nuxeo.Request = Request;
Nuxeo.Repository = Repository;
Nuxeo.Document = Document;
Nuxeo.BatchUpload = BatchUpload;
Nuxeo.Blob = Blob;
Nuxeo.BatchBlob = BatchBlob;
Nuxeo.Users = Users;
Nuxeo.User = User;
Nuxeo.Groups = Groups;
Nuxeo.Group = Group;
Nuxeo.Directory = Directory;
Nuxeo.DirectoryEntry = DirectoryEntry;
Nuxeo.Workflows = Workflows;
Nuxeo.Workflow = Workflow;
Nuxeo.Task = Task;

Nuxeo.promiseLibrary(Promise);

export default Nuxeo;