import React, { useState, useEffect, useLayoutEffect } from "react";
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
  const [actionType, setActionType] = useState({
    id: null,
    data: null
  })

  useEffect(() => {
    console.log('Global use effect call');
    /**
     * Call to get entities
     */
    getEntities();
    /**
     * Call to get actions
     */
    getActions();

  }, []);

  useEffect(() => {
    /**
      * Call to get action types
      */
    getActionTypes();

  }, [])

  useEffect(() => {
    console.log('props reset permission', props.resetPermissions)
    if (props.resetPermissions == 'yes') {
      console.log('data to null')
      //Empty edited permission data
      setEditedPermissionData([]);
      // Reflect permission data
      getEntities();
    }
  }, [props.resetPermissions])


  /**
   * Pre populate permission matrix data
   */
  useEffect(() => {
    if (Array.isArray(props.setPermissionData) && props.setPermissionData.length) {
      console.log('Props permission data ', props.setPermissionData, 'action type id', props.setPermissionData[0].actions[0].actionTypeId);
      let actionTyId = props.setPermissionData[0].actions[0].actionTypeId;
      //Set permissions data
      setPermissions(props.setPermissionData);
      //Empty edited permission data
      setEditedPermissionData([]);
      //Restructure permission data
      props.setPermissionData.map((permission, key) => {
        let associatedActions = [];
        permission.actions.map((action, key) => {
          associatedActions.push(action.actionId);
        });
        editedPermissionData.push({
          entity: permission.entity,
          actions: associatedActions,
          actionTypeId: actionTyId
        })
      });
      // Reflect permission data
      getEntities();
      // setActionType(...actionType, actionType.id : props.setPermissionData[0].actions[0].actionTypeId)
      // getActionTypes();
      setTimeout(() => {
        getActionTypes();
        console.log('execute at last');
      }, 2000);
    }

  }, [props.setPermissionData]);

  /**
   * Execute use effect at last 
   */
  useEffect(() => {

  }, []);

  /**
   * Handle data type
   */
  const handleActionType = (e) => {
    // console.log('Type id', e.target.value)

    let actionTypes = actionType.data && actionType.data.map((actionType, key) => {
      return {
        isChecked: (e.target.value === actionType._id ? true : false),
        _id: actionType._id,
        name: actionType.name,
        slug: actionType.slug,
      }
    });
    setActionType({
      id: e.target.value,
      data: actionTypes
    })
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
          console.log('Permission entities', editedPermissionData);
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
                      let filterSubEntity = editedPermissionData.length && editedPermissionData.filter(obj => {
                        return obj.entity === subEntity._id
                      });
                      return {
                        isChecked: filterSubEntity.length && filterSubEntity[0].actions.includes(subEntityAction._id) ? true : false,
                        _id: subEntityAction._id,
                        slug: subEntityAction.slug,
                        name: subEntityAction.name,
                      }
                    })
                  };
                }),
                associatedActions: entity.associatedActions.map((associatedAction, key) => {
                  let filterEntity = editedPermissionData.length && editedPermissionData.filter(obj => {
                    return obj.entity === entity._id
                  });
                  return {
                    isChecked: filterEntity.length && filterEntity[0].actions.includes(associatedAction._id) ? true : false,
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
                order: action.order
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
          console.log('Permission action types', editedPermissionData);
          if (result) {
            let actionTypes = result.actionTypes.map((actionType, key) => {
              return {
                isChecked: editedPermissionData.length ? (editedPermissionData[0].actionTypeId === actionType._id) : (actionType.slug === 'own-data') ? true : false,
                _id: actionType._id,
                name: actionType.name,
                slug: actionType.slug,
              }
            });
            // let currentActionTypeId = Array.isArray(props.setPermissionData) && props.setPermissionData.length ? props.setPermissionData[0].actions[0].actionTypeId : actionTypes[0]._id;
            let currentActionTypeId = editedPermissionData.length ? editedPermissionData[0].actionTypeId : actionTypes[0]._id;
            //Set action type checked
            setActionType({
              id: currentActionTypeId,
              data: actionTypes
            })
            // setActionTypeData(actionTypes);
            console.log('Set initial action type id', currentActionTypeId)
            //Set action type id 
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
        // Select all option
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
              // console.log('Sub entity action global permission-' + key, subEntity.slug, subEntityAction.isChecked && (subEntity._id === entityId) && (dataId > 0) && (key == 0));
              return {
                // Deselect all the actions if read unchecked
                isChecked: subEntityAction.isChecked && (subEntity._id === entityId || entity._id === entityId) && (dataId == 0) ?
                  // Select read action if any action gets selected
                  isChecked : !subEntityAction.isChecked && (subEntity._id === entityId || entity._id === entityId) && (key == 0) ?
                    // Select all option
                    isChecked : (typeof entityId === 'undefined' && typeof actionId === 'undefined') ?
                      //Select sub entity action for a specific main entity
                      isChecked : (subEntityAction._id === actionId && (entity._id === entityId)) ?
                        // Select entity and sub-entity actions, if global checkbox checked
                        isChecked : (typeof actionId === 'undefined' && (entity._id === entityId)) ?
                          // Select sub entity action
                          isChecked : (subEntity._id === entityId) && (subEntityAction._id === actionId) ?
                            // Keep is checked flag value
                            isChecked : (subEntityAction.isChecked ? subEntityAction.isChecked : false),
                _id: subEntityAction._id,
                slug: subEntityAction.slug,
                name: subEntityAction.name,
              }
            })
          };
        }),
        associatedActions: entity.associatedActions.map((associatedAction, key) => {
          // console.log('Current action status-' + entity.slug + '-' + key, dataId, (entity._id === entityId) && (key <= dataId));
          return {
            // Deselect main entity all actions it read action unchecked
            isChecked: associatedAction.isChecked && (entity._id === entityId) && (dataId == 0) ?
              // Select read action if any other action selected
              isChecked : !associatedAction.isChecked && (entity._id === entityId) && (key == 0) ?
                // Select all option
                isChecked : (typeof entityId === 'undefined' && typeof actionId === 'undefined') ?
                  // Select main entity checkbox
                  isChecked : (typeof actionId === 'undefined' && (entity._id === entityId)) ?
                    // Select current entity and action
                    isChecked : (((entity._id === entityId) && (associatedAction._id === actionId)) ?
                      // Keep is checked flag value
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
          actionTypeId: actionType.id
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
            actionTypeId: actionType.id
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
        permissions.splice(permissions.findIndex(p => p.entity === entityId), 1);
        entity.subEntity.map((subEntityEle, key) => {
          permissions.splice(permissions.findIndex(p => p.entity === subEntityEle._id), 1);
        });

        console.log('Handle entity change cleared', permissions);
      }
    });
    /**
     * Send data to parent
     */
    broadcastToParent(permissions);
  }

  const globalUpdateActionPemissions = (isCheckedAction, entityId, actionId, dataId) => {
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
         * and all the dependent actions
         */

        let filteredActions = result[0].actions.filter(function (action, index, arr) {
          return action.actionId !== actionId;
        });
        console.log('Filtered', filteredActions);
        result[0].actions = filteredActions;

        //Remove dependent actions too - if read unchecked
        if (dataId == 0) {
          console.log('Remove dependent actions too');
          let getCurdActions = makeCrudActions();
          console.log('curd actions', getCurdActions);
          filteredActions = filteredActions.filter(action => !getCurdActions.includes(action.actionId));
          console.log('filtered data after curd actions', filteredActions);
          result[0].actions = filteredActions;
          //If read action unchecked, remove import and export
          // if (parseInt(dataId) === 0) {
          //   console.log('Remove dependent import and export actions too');
          //   let getIEActions = makeIEActions();
          //   filteredActions = filteredActions.filter(action => !getIEActions.includes(action.actionId));
          //   result[0].actions = filteredActions;
          // }
        }



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
                  //If read action deselected - remove depended actions
                  if (dataId == 0) {
                    let getCurdActions = makeCrudActions();
                    filteredSpecificActions = filteredSpecificActions.filter(action => !getCurdActions.includes(action.actionId));
                  }
                  // console.log('fil specific actions', permissionIndex, filteredSpecificActions)
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
        let actionSet = makeActionsSet(dataId, actionId);
        console.log('get actions set', actionSet);
        actionSet.every((action) => {
          let actionIndex = result[0].actions.findIndex(a => a.actionId === action.actionId);
          if (actionIndex < 0) {
            console.log('In every', action);
            result[0].actions.push(action);
          }
        });

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
                //Check if action not exists then push
                let actionIndex = permission.actions.findIndex(a => a.actionId === actionId);
                console.log('action index', actionIndex);
                if (actionIndex < 0) {
                  permission.actions.push(
                    {
                      actionId: actionId,
                      actionTypeId: actionType.id
                    }
                  );
                }
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
        let makeActions = [];
        entityData.map((entity, key) => {
          if (entity._id === entityId && isCheckedAction) {
            //Check parent entity present or not in permissions
            let permissionIndex = permissions.findIndex(p => p.entity === entityId);
            if (permissionIndex >= 0) {
              //Entity present
              console.log('push from parent enty here')
              permissions[permissionIndex].actions.push({
                actionId: actionId,
                actionTypeId: actionType.id
              });
            } else {
              //Get all the action ids upto delete
              actionData.map((action, key) => {
                //Insert all previous actions then selected action
                if (key == 0 || key == dataId) {
                  makeActions.push({
                    actionId: action._id,
                    actionTypeId: actionType.id
                  })
                  console.log('new action 2', key, dataId, action);
                }
              })
              permissions.push({
                entity: entityId,
                actions: makeActions
              })
            }

            entity.subEntity.map((subEntityEle, key) => {
              //Check sub entity present or not in permissions
              let permissionSubIndex = permissions.findIndex(p => p.entity === subEntityEle._id);
              if (permissionSubIndex >= 0) {
                //Sub entity present
                console.log('push from sub enty here')
                // permissions[permissionSubIndex].actions.push({
                //   actionId: actionId,
                //   actionTypeId: actionTypeId
                // });
              } else {
                //Sub entity not present
                permissions.push({
                  entity: subEntityEle._id,
                  actions: makeActions
                })
              }
            });
          }
        })
      } else {
        let makeActions = [];
        // if (parseInt(dataId) !== 4 && parseInt(dataId) !== 5) {
        //Get all the action ids upto delete
        actionData.map((action, key) => {
          //Insert all previous actions then selected action
          if (key == 0 || key == dataId) {
            makeActions.push({
              actionId: action._id,
              actionTypeId: actionType.id
            })
            console.log('new acsn', key, typeof dataId, dataId, action);
          }
        })
        // } else {
        //   console.log('else action data')
        //   makeActions.push({
        //     actionId: actionId,
        //     actionTypeId: actionTypeId
        //   })
        // }

        permissions.push({
          entity: entityId,
          actions: makeActions
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
    globalUpdateActionPemissions(isCheckedAction, entityId, actionId, dataId);
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

  /**
   * Make actions array of objets
   * upto selected action
   */
  const makeActionsSet = (dataId, actionId) => {
    let makeActions = [];
    if (parseInt(dataId) !== 4 && parseInt(dataId) !== 5) {
      //Get all the action ids upto delete
      actionData.map((action, key) => {
        //Insert all previous actions then selected action
        if (key == dataId) {
          makeActions.push({
            actionId: action._id,
            actionTypeId: actionType.id
          })
          console.log('global func make actions set', key, typeof dataId, dataId, action);
        }
      })
    } else {
      console.log('global func else action data')
      makeActions.push({
        actionId: actionId,
        actionTypeId: actionType.id
      })
    }
    console.log('global func Make actions set', dataId, actionId);
    return makeActions;
  }

  /**
   * Make actions object for CRUD actions
   */
  const makeCrudActions = () => {
    let makeActions = [];
    //Get all the action ids upto delete
    actionData.map((action, key) => {
      //Insert all CRUD action
      //if (key == 3) {
      makeActions.push(action._id);
      //}
    })
    return makeActions;
  }

  /**
   * Make actions object for CRUD actions
   */
  const makeIEActions = () => {
    let makeActions = [];
    //Get all the action ids upto delete
    actionData.map((action, key) => {
      //Insert all CRUD action
      if (key >= 4) {
        makeActions.push(action._id);
      }
    })
    return makeActions;
  }


  return (
    <>
      <div className="permission">
        {isLoader ? <Loader /> : ''}
        <p className="permissionHead clearfix">
          Manage permissions
          {actionType && actionType.data && actionType.data.map((el, key) => {
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
                            -
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
                                actionTypeId: actionType.id
                              }
                            )
                          } else if (!pemissionIndex.length) {
                            console.log('else preset index', getIndex);
                            let makeActions = [];
                            //Get all the action ids upto delete
                            actionData.map((action, key) => {
                              //Insert all previous actions then selected action
                              if (key == 0 || action._id == currentActionId) {
                                makeActions.push({
                                  actionId: action._id,
                                  actionTypeId: actionType.id
                                })
                                console.log('new action 3', key, getIndex, action);
                              }
                            })
                            permissions.push({
                              entity: entity._id,
                              actions: makeActions
                            });
                            console.log('at last', permissions);
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
                                  // checked={action.isChecked ? action.isChecked : false}
                                  checked={isAllSubActions ? true : (action.isChecked && !getIndex.length ? true : false)}
                                  onChange={(e) => handleActionChange(e, entity._id, entity.slug, action._id, action.slug)} />
                                <span></span>
                              </label>
                            </span>
                          </React.Fragment>
                        );
                      })}
                      <ul className="optionMoreInput open show">
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
