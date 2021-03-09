<?php

namespace Drupal\players\Plugin\GraphQL\PersistedQuery;

use Drupal\graphql\PersistedQuery\PersistedQueryPluginBase;
use GraphQL\Server\OperationParams;

/**
 * @PersistedQuery(
 *   id = "persisted_query_create_player",
 *   label = "Persisted Query Create Player",
 *   description = "Persisted query plugin for create player mutation"
 * )
 *
 * Class PersistedQueryCreatePlayer
 * @package Drupal\players\Plugin\GraphQL\PersistedQuery
 */
class PersistedQueryCreatePlayer extends PersistedQueryPluginBase {

  /**
   * {@inheritdoc}
   */
  public function getQuery($id, OperationParams $operation) {
    $queryMap = $this->queryMap();
    return $queryMap[$id] ?? NULL;
  }

  /**
   * Map between persisted query IDs and corresponding GraphQL queries.
   */
  protected function queryMap() {
    return [
      'd6d8dcb3dada161a2b180b516712e66a6ef63094d39a9037c9dabdda69c3d33e' => 'mutation CreatePlayer ($firstName: String!, $lastName: String!) { createPlayer (data: {firstName: $firstName, lastName: $lastName}) { id } }',
    ];
  }

}
