import React, { useState, useEffect } from "react";
import { PermissionServices } from "../../services/authentication/PermissionServices";
import Loader from "./Loader";


const PermissionMatrix = (props) => {
  const [entityData, setEntityData] = useState('');
  const [actionData, setActionData] = useState('');
  const [actionTypeData, setActionTypeData] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [actionTypeId, setActionTypeId] = useState('');
  const [editActionTypeId, setEditActionTypeId] = useState('');
  const [editedPermissionData, setEditedPermissionData] = useState([]);
  const [isAllSubActionGlobal, setIsAllSubActionGlobal] = useState([]);
  const [currentActionId, setCurrentActionId] = useState('');
  const [isSelectAll, setIsSelectAll] = useState(true);


  useEffect(() => {
    /**
     * Call to get entities
     */
    getEntities();
    /**
     * Call to get actions
     */
    getActions();

  }, []);

  /**
   * Depends on edited action type ID
   */
  useEffect(() => {
    /**
      * Call to get action types
      */
    getActionTypes();
  }, [editActionTypeId]);

  /**
   * Pre populate permission matrix data
   */
  useEffect(() => {
    console.log('Props', props.setPermissionData);

    if (Array.isArray(props.setPermissionData) && props.setPermissionData.length) {
      // console.log('set permission data', props.setPermissionData);
      setPermissions(props.setPermissionData);
      /**
       * Set action type
       */
      setEditActionTypeId(props.setPermissionData[0].actions[0].actionTypeId)
      // console.log('action type Id', props.setPermissionData[0].actions[0].actionTypeId)
      props.setPermissionData.map((permission, key) => {
        // console.log('here permission', permission);
        let associatedActions = [];
        permission.actions.map((action, key) => {
          // console.log('here action', action);
          associatedActions.push(action.actionId);
        });
        editedPermissionData[permission.entity] = associatedActions;
      })
      // console.log('get en arr', editedPermissionData);
      getEntities();
      //Check select all
    }
  }, [props.setPermissionData]);

  /**
   * Handle data type
   */
  const handleActionType = (e) => {
    // console.log('Type id', e.target.value)

    let actionTypes = actionTypeData.map((actionType, key) => {
      return {
        isChecked: (e.target.value === actionType._id ? true : false),
        _id: actionType._id,
        name: actionType.name,
        slug: actionType.slug,
      }
    });
    setActionTypeData(actionTypes);
    setActionTypeId(e.target.value);
    /**
     * Update action type ID
     * for all the entities
     */
    if (permissions.length) {
      let updatedPermission = permissions.map((entities, key) => {
        return {
          entity: entities.entity,
          actions: entities.actions.map((action, key) => {
            return {
              actionId: action.actionId,
              actionTypeId: e.target.value
            }
          })
        }
      });
      console.log('update permission set', updatedPermission);
      setPermissions(updatedPermission);

      /**
       * Send data to parent
       */
      broadcastToParent(updatedPermission);

    }
  }

  /**
   * Function get entities
   */
  const getEntities = async () => {
    try {
      setIsLoader(true);
      await PermissionServices.entity()
        .then(result => {
          //console.log('Permission entities', result);
          if (result) {
            let entities = result.entities.map((entity, key) => {
              return {
                isChecked: false,
                _id: entity._id,
                name: entity.name,
                slug: entity.slug,
                subEntity: entity.subEntity.map((subEntity, key) => {
                  return {
                    isChecked: false,
                    _id: subEntity._id,
                    slug: subEntity.slug,
                    name: subEntity.name,
                    associatedActions: entity.associatedActions.map((subEntityAction, key) => {
                      return {
                        isChecked: editedPermissionData[subEntity._id] && editedPermissionData[subEntity._id].includes(subEntityAction._id) ? true : false,
                        _id: subEntityAction._id,
                        slug: subEntityAction.slug,
                        name: subEntityAction.name,
                      }
                    })
                  };
                }),
                associatedActions: entity.associatedActions.map((associatedAction, key) => {
                  return {
                    isChecked: editedPermissionData[entity._id] && editedPermissionData[entity._id].includes(associatedAction._id) ? true : false,
                    _id: associatedAction._id,
                    slug: associatedAction.slug,
                    name: associatedAction.name,
                  }
                })
              };
            });
            setEntityData(entities);
          }
          setIsLoader(false);
        })
    } catch (e) {
      console.log('Permission entities error', e);
      if (e.response && e.response.status == 403) {
        setErrorMsg("You dont have permission to perform this action");
      }
      else if (e.response && e.response.data.message) {
        setErrorMsg(e.response.data.message);
      }
    }
    setIsLoader(false);
  }

  /**
   * Function get actions
   */
  const getActions = async () => {
    try {
      await PermissionServices.action()
        .then(result => {
          //console.log('Permission actions', result);
          if (result) {
            let actions = result.actions.map((action, key) => {
              return {
                isChecked: false,
                _id: action._id,
                name: action.name,
                slug: action.slug,
              }

            });
            setActionData(actions);
          }
        })
    } catch (e) {
      console.log('Permission actions error', e);
      if (e.response && e.response.status == 403) {
        setErrorMsg("You dont have permission to perform this action");
      }
      else if (e.response && e.response.data.message) {
        setErrorMsg(e.response.data.message);
      }
    }
  }

  /**
   * Function get action types
   */
  const getActionTypes = async () => {
    try {
      await PermissionServices.actionType()
        .then(result => {
          // console.log('Permission action types', result);
          if (result) {
            let actionTypes = result.actionTypes.map((actionType, key) => {
              return {
                isChecked: editActionTypeId ? (actionType._id === editActionTypeId ? true : false) : (actionType._id === result.actionTypes[0]._id ? true : false),
                _id: actionType._id,
                name: actionType.name,
                slug: actionType.slug,
              }
            });
            setActionTypeData(actionTypes);
            /**
             * If edit take edited action type id
             * else take own data action type id
             */
            // console.log('Edited id', editActionTypeId);
            setActionTypeId(editActionTypeId ? editActionTypeId : actionTypes[0]._id);
          }
        })
    } catch (e) {
      console.log('Permission action types error', e);
      if (e.response && e.response.status == 403) {
        setErrorMsg("You dont have permission to perform this action");
      }
      else if (e.response && e.response.data.message) {
        setErrorMsg(e.response.data.message);
      }
    }
  }

  /**
   * Show more button
   * for subentities
   * @param {*} e 
   */
  const showMore = (e) => {
    e.preventDefault(e);
    if (e.target.textContent === "+") {
      e.target.textContent = "-";
      e.target
        .closest(".inputCheckBox")
        .querySelectorAll(".optionMoreInput")[0]
        .classList.add("show");
    } else {
      e.target.textContent = "+";
      e.target
        .closest(".inputCheckBox")
        .querySelectorAll(".optionMoreInput")[0]
        .classList.remove("show");
    }
  };
  /**
   * Global permission checkbox state
   * @param {*} e 
   */
  const globalPermissionState = (isChecked, entityId, actionId, dataId) => {
    console.log('Global permission state', entityId, actionId, dataId);
    let entities = entityData.map((entity, key) => {
      return {
        isChecked: (typeof entityId === 'undefined' && typeof actionId === 'undefined') ?
          isChecked : (!actionId && (entity._id === entityId) ? isChecked : false),
        _id: entity._id,
        name: entity.name,
        slug: entity.slug,
        subEntity: entity.subEntity.map((subEntity, key) => {
          return {
            isChecked: (entity._id === entityId) ? isChecked : false,
            _id: subEntity._id,
            slug: subEntity.slug,
            name: subEntity.name,
            associatedActions: subEntity.associatedActions.map((subEntityAction, key) => {
              //console.log('Sub entity action global permission-' + key,subEntity.slug, subEntity._id , subEntityAction.slug, subEntityAction._id  , entityId);
              return {
                isChecked: (typeof entityId === 'undefined' && typeof actionId === 'undefined') ?
                  isChecked : (subEntityAction._id === actionId && (entity._id === entityId)) ?
                    isChecked : (typeof actionId === 'undefined' && (entity._id === entityId)) ?
                      isChecked : ((subEntity._id === entityId) && (subEntityAction._id === actionId) ?
                        isChecked : (subEntityAction.isChecked ? subEntityAction.isChecked : false)),
                _id: subEntityAction._id,
                slug: subEntityAction.slug,
                name: subEntityAction.name,
              }
            })
          };
        }),
        associatedActions: entity.associatedActions.map((associatedAction, key) => {
          // console.log('Current action status-' + entity.slug + '-' + key, associatedAction.isChecked);
          return {
            isChecked: (typeof entityId === 'undefined' && typeof actionId === 'undefined') ?
              isChecked : (typeof actionId === 'undefined' && (entity._id === entityId)) ? isChecked : (((entity._id === entityId) && (associatedAction._id === actionId)) ?
                isChecked : (associatedAction.isChecked ? associatedAction.isChecked : false)),
            _id: associatedAction._id,
            slug: associatedAction.slug,
            name: associatedAction.name,
          }
        })
      };
    });
    setEntityData(entities);
  }

  /**
   * Handle select all 
   */
  const handleSelectAllChange = async (e) => {
    e.preventDefault();
    //select all checkbox
    globalPermissionState(isSelectAll);
    //toggle select all state
    setIsSelectAll(!isSelectAll);
    console.log('is select all', isSelectAll);
    //Insert all the entity and action to permissions array
    if (isSelectAll) {
      // console.log('going inside select all')
      let actions = [];
      actionData.map((actionEle, key) => {
        actions.push({
          actionId: actionEle._id,
          actionTypeId: actionTypeId
        })
      });
      entityData.map((entity, key) => {
        permissions.push({
          entity: entity._id, actions
        })
        entity.subEntity.map((subEntityEle, key) => {
          permissions.push({
            entity: subEntityEle._id, actions
          })
        });
      });

    } else {
      //Deselect all
      permissions.splice(0, permissions.length);
    }
    /**
     * Send data to parent
     */
    broadcastToParent(permissions);
  }

  /**
   * Handle entity change
   */
  const handleEntityChange = async (e) => {
    console.log('Event', e.target.value, 'Entity: ', entityData, 'Action: ', actionData)
    let isCheckedEntity = e.target.checked;
    let entityId = e.target.value;
    //Call to global permission state for UI
    globalPermissionState(isCheckedEntity, entityId);
    /**
     * Update permissions
     */
    let actions = [];
    entityData.map((entity, key) => {
      if (entity._id === entityId && isCheckedEntity) {
        /**
         * Select all sub entities with
         * all the actions
         */

        actionData.map((actionEle, key) => {
          actions.push({
            actionId: actionEle._id,
            actionTypeId: actionTypeId
          })
        });

        permissions.push({
          entity: entity._id, actions
        })

        entity.subEntity.map((subEntityEle, key) => {
          permissions.push({
            entity: subEntityEle._id, actions
          })
        });
        console.log('Handle entity change', permissions);
      } else if (entity._id === entityId && !isCheckedEntity) {
        /**
         * Empty permissions
         */
        permissions.splice(permissions.findIndex(entity => entity._id === entityId), 1);
        entity.subEntity.map((subEntityEle, key) => {
          permissions.splice(permissions.findIndex(entity => subEntityEle._id === entityId), 1);
        });

        console.log('Handle entity change cleared', permissions);
      }
    });
    /**
     * Send data to parent
     */
    broadcastToParent(permissions);
  }

  const globalUpdateActionPemissions = (isCheckedAction, entityId, actionId) => {
    let isParentEntity = entityData.findIndex(entity => entity._id === entityId);

    let hasEntity = hasEntitySet(permissions, entityId);
    setCurrentActionId(actionId);

    if (hasEntity >= 0) {
      console.log('inside has entity');
      /**
       * Specific entity present
       * update actions
       */
      let result = permissions.filter(obj => {
        return obj.entity === entityId
      });

      // console.log('premission index', permissionIndex);
      /**
       * Check if a specific action 
       * already exists
       */
      let isActionExists = result[0].actions.findIndex(action => action.actionId === actionId);
      if (isActionExists >= 0) {
        console.log('Inside action exists', result[0], result[0].actions)
        /**
         * Action exists already
         * remove specific action
         */
        let filteredActions = result[0].actions.filter(function (action, index, arr) {
          return action.actionId !== actionId;
        });
        console.log('Filtered', filteredActions);
        result[0].actions = filteredActions;
        // result[0].actions.splice(result[0].actions.findIndex(a => a.actionId === actionId), 1);
        // console.log('after execution', permissions);
        // permissions[permissionIndex].actions.splice(permissions[permissionIndex].actions.findIndex(a => a.actionId === actionId), 1);



        /**
         * If actions count zero
         * then delete the entity
         */
        if (result[0].actions.length === 0) {
          console.log('actions length become zero')
          //console.log('Updated actions after delete', result[0].actions.length);
          permissions.splice(permissions.findIndex(p => p.entity === entityId), 1);
        }

        /**
        * if parent entity selected
        * remove the action from all the
        * entity
        */
        if (isParentEntity >= 0) {
          console.log('ParentEnt')
          //Loop through entities
          entityData.map((entity, key) => {
            if (entity._id === entityId) {
              //Loop through sub entities
              entity.subEntity.map((subEnt, key) => {
                //Select object index from permissions
                let permissionIndex = permissions.findIndex(p => p.entity === subEnt._id);
                //Replace actions from specific entity
                if (permissionIndex >= 0) {
                  let filteredSpecificActions = permissions[permissionIndex].actions.filter(function (action, index, arr) {
                    return action.actionId !== actionId;
                  });
                  if (filteredSpecificActions.length) {
                    //Actions exists
                    permissions[permissionIndex].actions = filteredSpecificActions;
                  } else {
                    //Action became zero delete the entity
                    permissions.splice(permissions.findIndex(p => p.entity === subEnt._id), 1);
                  }
                }
              })
            }
          });
        } else {
          console.log('subent')
          entityData.findIndex(entity => {
            if (entity.subEntity.findIndex(subEnt => subEnt._id === entityId) >= 0) {
              //Select object index from permissions
              let permissionIndex = permissions.findIndex(p => p.entity === entity._id);
              //Replace actions from specific entity
              if (permissionIndex >= 0) {
                console.log('subEnt ations zero', filteredActions);
                if (filteredActions.length) {
                  // Action exists
                  permissions[permissionIndex].actions = filteredActions;
                } else {
                  //Action became zero delete the entity
                  permissions.splice(permissions.findIndex(p => p.entity === entity._id), 1);
                }
              }
            }
          });
        }

      } else {
        /**
         * Push new action in the
         * specific entity
         */
        result[0].actions.push(
          {
            actionId: actionId,
            actionTypeId: actionTypeId
          }
        )
        /**
         * if parent entity selected
         * add the action to all the
         * sub entity
         */
        if (isParentEntity >= 0) {
          console.log('inside has entity parent entity', entityId);
          let subEntities = [];
          entityData.map(entity => {
            if (entity._id === entityId) {
              //Get sub entitied here if entity id mathched
              entity.subEntity.map(subEnt => {
                // console.log('matched entity', subEnt);
                //Select object index from permissions
                subEntities.push(subEnt._id);
              });
            }
          });
          console.log('Selected sub entities', subEntities);
          //Check sub entities length
          if (subEntities.length) {
            permissions.map((permission, key) => {
              if (subEntities.includes(permission.entity)) {
                console.log('if sub entt push action', actionId);
                permission.actions.push(
                  {
                    actionId: actionId,
                    actionTypeId: actionTypeId
                  }
                );
              }
            });
          }
        }

      }
      //console.log('update specific actions', result[0].actions);
    } else {
      /**
       * Entity not preset
       */
      console.log('else part', isParentEntity);
      if (isParentEntity >= 0) {
        /**
         * If selected parent entity
         * then add the same action
         * for all the individual
         * entity
         */
        console.log('if to else part', entityId)
        entityData.map((entity, key) => {
          if (entity._id === entityId && isCheckedAction) {
            //Check parent entity present or not in permissions
            let permissionIndex = permissions.findIndex(p => p.entity === entityId);
            if (permissionIndex >= 0) {
              //Entity present
              console.log('push from parent enty here')
              permissions[permissionIndex].actions.push({
                actionId: actionId,
                actionTypeId: actionTypeId
              });
            } else {
              permissions.push({
                entity: entityId,
                actions: [
                  {
                    actionId: actionId,
                    actionTypeId: actionTypeId
                  }
                ]
              })
            }

            entity.subEntity.map((subEntityEle, key) => {
              //Check sub entity present or not in permissions
              let permissionSubIndex = permissions.findIndex(p => p.entity === subEntityEle._id);
              if (permissionSubIndex >= 0) {
                //Sub entity present
                console.log('push from sub enty here')
                permissions[permissionSubIndex].actions.push({
                  actionId: actionId,
                  actionTypeId: actionTypeId
                });
              } else {
                //Sub entity not present
                permissions.push({
                  entity: subEntityEle._id,
                  actions: [
                    {
                      actionId: actionId,
                      actionTypeId: actionTypeId
                    }
                  ]
                })
              }
            });
          }
        })
      } else {
        permissions.push({
          entity: entityId,
          actions: [
            {
              actionId: actionId,
              actionTypeId: actionTypeId
            }
          ]
        })
      }
    }
  }

  /**
   * Handle entity change
   */
  const handleActionChange = async (e, entityId, entitySlug, actionId, actionSlug) => {
    console.log('Handle action change: ', entityId, entitySlug, 'Action: ', actionId, actionSlug, e.target.attributes.getNamedItem('data').value);
    /**
     * Check or uncheck UI
     */
    let isCheckedAction = e.target.checked;
    let dataId = e.target.attributes.getNamedItem('data').value;
    //console.log('Is checked action', isCheckedAction);
    globalPermissionState(isCheckedAction, entityId, actionId, dataId);
    /**
     * Update action permissions
     */
    globalUpdateActionPemissions(isCheckedAction, entityId, actionId);
    // console.log('updated permissions', permissions);

    /**
     * Send data to parent
     */

    broadcastToParent(permissions);
  }

  /**
   * Send the data to parent component
   * @param {*} data
   */
  const broadcastToParent = (data) => {
    props.getData(data);
  };

  /**
   * Check if entity already exists
   * @param {*} permissions 
   * @param {*} entityId 
   * @returns 
   */
  const hasEntitySet = (permissions, entityId) => {
    // console.log('hit has entity set', permissions, typeof permissions);
    let entity = permissions.findIndex((permission) => permission.entity === entityId);
    // console.log('Preset', entity);
    return entity;
  }


  return (
    <>
      <div className="permission">
        {isLoader ? <Loader /> : ''}
        <p className="permissionHead clearfix">
          Manage permissions
          {actionTypeData && actionTypeData.map((el, key) => {
            return (
              <React.Fragment key={key + "actionTypes"}>
                <label className="checkCutsom">
                  <input type="checkbox" value={el._id} checked={el.isChecked} onChange={handleActionType} />
                  <span></span>
                  <em>{el.name}</em>
                </label>
              </React.Fragment>
            );
          })}
        </p>
        <div className="InputsContainer">
          <ul>
            <li className="inputsContainerHead">
              <p>
                Entity <button className="btn-link" onClick={(e) => handleSelectAllChange(e)}>{isSelectAll ? 'Select ' : 'Deselect '} All</button>
              </p>
              {actionData && actionData.map((el, key) => {
                return (
                  <React.Fragment key={key + "actions"}>
                    <p>{el.name}</p>
                  </React.Fragment>
                );
              })}
            </li>
            {entityData &&
              entityData.map((entity, key) => {
                // console.log('Top level entity', entity);
                /**
                 * Check the entity box
                 * if all actions selected
                 */
                let allAction = [];
                let holdSubAction = [];
                entity.associatedActions.map((associatedAction, key) => {
                  allAction.push(associatedAction.isChecked);
                })
                let isAllAction = allAction.every(v => v === true);


                entity.subEntity && entity.subEntity.map((subEle, key) => {
                  // console.log('Entity -', entity.slug, 'sub entity -', subEle.slug);
                  subEle.associatedActions && subEle.associatedActions.map((action, key) => {
                    holdSubAction.push({ id: action._id, value: action.isChecked });
                  });
                });

                let allSubAction = holdSubAction.reduce(function (o, cur) {
                  // Get the index of the key-value pair.
                  var occurs = o.reduce(function (n, item, i) {
                    return (item.id === cur.id) ? i : n;
                  }, -1);

                  // If the name is found,
                  if (occurs >= 0) {

                    // append the current value to its list of values.
                    o[occurs].value = o[occurs].value.concat(cur.value);

                    // Otherwise,
                  } else {

                    // add the current item to o (but make sure the value is an array).
                    var obj = {
                      id: cur.id,
                      value: [cur.value]
                    };
                    o = o.concat([obj]);
                  }

                  return o;
                }, []);
                // console.log('All sub action', allSubAction);
                // console.log('is all action', isAllAction);

                return (
                  <React.Fragment key={key + "entities"}>
                    <li className="inputCheckBox">
                      <span>
                        <label className="checkCutsom">
                          <input
                            type="checkbox"
                            value={entity._id}
                            checked={isAllAction ? isAllAction : (entity.isChecked ? entity.isChecked : false)}
                            onChange={(e) => handleEntityChange(e)}
                          />
                          <span></span>
                        </label>
                        <p>
                          <button className="triggerMore" onClick={(e) => showMore(e)}>
                            +
                          </button>
                          {entity.name}
                        </p>
                      </span>
                      {entity.associatedActions && entity.associatedActions.map((action, key) => {
                        let getIndex = allSubAction.filter(function (v, i) {
                          return v.id == action._id;
                        });

                        /**
                         * Check is all sub actions
                         * to push main entity in the global
                         * permissions array
                         */
                        if (getIndex.length && (getIndex[0].id === action._id) && getIndex[0].value.every(v => v === true) && (currentActionId === action._id)) {
                          console.log('inside global push', entity.slug, action.slug);
                          let pemissionIndex = permissions.filter(obj => {
                            return obj.entity === entity._id
                          });
                          let isActionPemissionExists = pemissionIndex.length && pemissionIndex[0].actions.findIndex(action => action.actionId === currentActionId);
                          // console.log('is action', pemissionIndex[0]);
                          if (pemissionIndex.length && (isActionPemissionExists === -1)) {
                            console.log('preset index');
                            pemissionIndex[0].actions.push(
                              {
                                actionId: action._id,
                                actionTypeId: actionTypeId
                              }
                            )
                          } else if (!pemissionIndex.length) {
                            console.log('else preset index', pemissionIndex);
                            permissions.push({
                              entity: entity._id,
                              actions: [
                                {
                                  actionId: action._id,
                                  actionTypeId: actionTypeId
                                }
                              ]
                            })
                          }
                        }
                        let isAllSubActions = (getIndex.length && getIndex[0].id === action._id && getIndex[0].value.every(v => v === true));
                        // console.log('entity associated actions',action.isChecked, isAllSubActions)

                        return (
                          <React.Fragment key={key + "actions"}>
                            <span>
                              <label className="checkCutsom">
                                <input
                                  type="checkbox"
                                  value={action._id}
                                  data={key}
                                  checked={isAllSubActions ? true : (action.isChecked && !getIndex.length ? true : false)}
                                  onChange={(e) => handleActionChange(e, entity._id, entity.slug, action._id, action.slug)} />
                                <span></span>
                              </label>
                            </span>
                          </React.Fragment>
                        );
                      })}
                      <ul className="optionMoreInput">
                        {entity.subEntity && entity.subEntity.map((subEle, key) => {
                          //console.log('Sub ent', subEle.associatedActions)

                          return (
                            <React.Fragment key={key + "_sub"}>
                              <li>
                                <span>{subEle.name}</span>
                                {subEle.associatedActions && subEle.associatedActions.map((action, key) => {
                                  return (
                                    <React.Fragment key={key + "actions"}>
                                      <span>
                                        <label className="checkCutsom">
                                          <input
                                            type="checkbox"
                                            data={key}
                                            value={action._id}
                                            checked={action.isChecked ? action.isChecked : false}
                                            onChange={(e) => handleActionChange(e, subEle._id, subEle.slug, action._id, action.slug)} />
                                          <span></span>
                                        </label>
                                      </span>
                                    </React.Fragment>
                                  );
                                })}
                              </li>
                            </React.Fragment>
                          );
                        })}
                      </ul>
                    </li>
                  </React.Fragment>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PermissionMatrix;
