import React, { useState, useEffect } from "react";
import { PermissionServices } from "../../services/authentication/PermissionServices";
import Loader from "./Loader";


const PermissionMatrix = (props) => {
  const [entityData, setEntityData] = useState('');
  const [actionData, setActionData] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [actionTypeId, setActionTypeId] = useState('606caa9d8dd1e227032b01d6');

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
                        isChecked: false,
                        _id: subEntityAction._id,
                        slug: subEntityAction.slug,
                        name: subEntityAction.name,
                      }
                    })
                  };
                }),
                associatedActions: entity.associatedActions.map((associatedAction, key) => {
                  return {
                    isChecked: false,
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
  const globalPermissionState = (isChecked, entityId, actionId) => {
    // console.log('Global permission state', entityId, actionId);
    let entities = entityData.map((entity, key) => {
      return {
        isChecked: !actionId && (entity._id === entityId) ? isChecked : false,
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
                isChecked: (subEntityAction._id === actionId && (entity._id === entityId)) ?
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
          //console.log('Current action status-' + entity.slug + '-' + key, associatedAction.isChecked);
          return {
            isChecked: (typeof actionId === 'undefined' && (entity._id === entityId)) ? isChecked : (((entity._id === entityId) && (associatedAction._id === actionId)) ?
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
   * Handle entity change
   */
  const handleEntityChange = async (e) => {
    //console.log('Event', e.target.value, 'Entity: ', entityData, 'Action: ', actionData)
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
        console.log('Infection', permissions);
      } else if (entity._id === entityId && !isCheckedEntity) {
        /**
         * Empty permissions
         */
        permissions.splice(0, permissions.length)
        console.log('Infection cleared', permissions);
      }
    });
    /**
     * Send data to parent
     */
    broadcastToParent(permissions);
  }

  /**
   * Handle entity change
   */
  const handleActionChange = async (e, entityId, entitySlug, actionId, actionSlug) => {
    console.log('Hernia: ', entityId, entitySlug, 'Action: ', actionId, actionSlug);
    /**
     * Check or uncheck UI
     */
    let isCheckedAction = e.target.checked;
    //console.log('Is checked action', isCheckedAction);
    globalPermissionState(isCheckedAction, entityId, actionId);

    let isParentEntity = entityData.findIndex(entity => entity._id === entityId);
    let hasEntity = hasEntitySet(permissions, entityId);

    
    if (hasEntity >= 0) {
      console.log('inside has entity');
      /**
       * Specific entity present
       * update actions
       */
      var result = permissions.filter(obj => {
        return obj.entity === entityId
      });
      /**
       * Check if a specific action 
       * already exists
       */
      let isActionExists = result[0].actions.findIndex(action => action.actionId === actionId);
      //console.log('is action exists', isActionExists);
      if (isActionExists >= 0) {
        /**
         * Action exists already
         * remove specific action
         */
        result[0].actions.splice(result[0].actions.findIndex(a => a.actionId === actionId), 1);

        /**
         * If actions count zero
         * then delete the entity
         */
        if (result[0].actions.length === 0) {
          //console.log('Updated actions after delete', result[0].actions.length);
          permissions.splice(permissions.findIndex(p => p.entity === entityId), 1);
        }

        /**
        * if parent entity selected
        * remove the action to all the
        * entity
        */
         if (isParentEntity >= 0) {
          permissions.map((permission, key) => {
            if (permission.entity !== entityId) {
              permission.actions.splice(permission.actions.findIndex(a => a.actionId === actionId), 1);
              if(permission.actions.length === 0) {
                console.log('actions length became zero', permissions.findIndex(p => p.entity === permission.entity))
                // permissions.splice(permissions.filter(p => p.entity === permission.entity), 1);
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
         * entity
         */
        if (isParentEntity >= 0) {
          console.log('inside has entity parent entity', permissions);
          permissions.map((permission, key) => {
            if (permission.entity !== entityId) {
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
        console.log('if to else part')
        entityData.map((entity, key) => {
          if (entity._id === entityId && isCheckedAction) {
            permissions.push({
              entity: entityId,
              actions: [
                {
                  actionId: actionId,
                  actionTypeId: actionTypeId
                }
              ]
            })
            entity.subEntity.map((subEntityEle, key) => {
              permissions.push({
                entity: subEntityEle._id,
                actions: [
                  {
                    actionId: actionId,
                    actionTypeId: actionTypeId
                  }
                ]
              })
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
    //console.log(permissions, typeof permissions);
    let entity = permissions.findIndex((permission) => permission.entity === entityId);
    //console.log('Preset', entity);
    return entity;
  }

  return (
    <>
      <div className="permission">
        {isLoader ? <Loader /> : ''}
        <p className="permissionHead clearfix">
          Manage permissions
          <label className="checkCutsom">
            <input type="checkbox" />
            <span></span>
            <em>All Data</em>
          </label>
        </p>
        <div className="InputsContainer">
          <ul>
            <li className="inputsContainerHead">
              <p>
                Entity <button className="btn-link">Select All</button>
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
                entity.associatedActions.map((associatedAction, key) => {
                  allAction.push(associatedAction.isChecked);
                })
                let isAllAction = allAction.every(v => v === true);

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
                        //console.log('associated actions', action)
                        return (
                          <React.Fragment key={key + "actions"}>
                            <span>
                              <label className="checkCutsom">
                                <input
                                  type="checkbox"
                                  value={action._id}
                                  checked={action.isChecked ? action.isChecked : false}
                                  onChange={(e) => handleActionChange(e, entity._id, entity.slug, action._id, action.slug)} />
                                <span></span>
                              </label>
                            </span>
                          </React.Fragment>
                        );
                      })}
                      <ul className="optionMoreInput">
                        {entity.subEntity && entity.subEntity.map((subEle, key) => {
                          return (
                            <React.Fragment key={key + "_sub"}>
                              <li>
                                <span>{subEle.name}</span>
                                {subEle.associatedActions && subEle.associatedActions.map((action, key) => {
                                  //console.log('Sub entity current status-' + subEle.slug + '-' + key, action.isChecked);
                                  return (
                                    <React.Fragment key={key + "actions"}>
                                      <span>
                                        <label className="checkCutsom">
                                          <input
                                            type="checkbox"
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
