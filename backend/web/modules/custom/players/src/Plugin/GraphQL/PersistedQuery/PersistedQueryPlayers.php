<?php

namespace Drupal\players\Plugin\GraphQL\PersistedQuery;

use Drupal\graphql\PersistedQuery\PersistedQueryPluginBase;
use GraphQL\Server\OperationParams;

/**
 * @PersistedQuery(
 *   id = "persisted_query_players",
 *   label = "Persisted Query Players",
 *   description = "Persisted query plugin for players query"
 * )
 *
 * Class PersistedQueryPlayers
 * @package Drupal\players\Plugin\GraphQL\PersistedQuery
 */
class PersistedQueryPlayers extends PersistedQueryPluginBase {

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
      'b8c4356d0f9160ce507255c18ab5ea8e2337011bd601ba2aab5731c96e8ff9cc' => '{ players { items { id firstName lastName } } }',
    ];
  }

}
