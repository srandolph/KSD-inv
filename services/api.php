<?php
 	require_once("Rest.inc.php");

	class API extends REST {

		public $data = "";

		const DB_SERVER = "127.0.0.1";
		const DB_USER = "root";
		const DB_PASSWORD = "posix1";
		const DB = "ksd_inventory";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}

		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}

		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}

		private function inventories(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.itemNumber, c.itemName, c.serialNumber, c.type, c.room, c.city, c.ts FROM inventory c order by c.itemNumber desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function inventory(){
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="SELECT distinct c.itemNumber, c.itemName, c.serialNumber, c.type, c.room, c.city, c.ts FROM inventory c where c.itemNumber=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}

		private function insertInventory(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$inventory = json_decode(file_get_contents("php://input"),true);
			$column_names = array('itemName', 'serialNumber', 'type', 'room', 'city');
			$keys = array_keys($inventory);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the inventory received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $inventory[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO inventory(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($inventory)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "inventory Created Successfully.", "data" => $inventory);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateInventory(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$inventory = json_decode(file_get_contents("php://input"),true);
			$id = (int)$inventory['id'];
			$column_names = array('itemName', 'serialNumber', 'type', 'room', 'city');
			$keys = array_keys($inventory['inventory']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the inventory received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $inventory['inventory'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE inventory SET ".trim($columns,',')." WHERE itemNumber=$id";
			if(!empty($inventory)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "inventory ".$id." Updated Successfully.", "data" => $inventory);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}

		private function deleteInventory(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){
				$query="DELETE FROM inventory WHERE itemNumber = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}

		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}

	// Initiiate Library

	$api = new API;
	$api->processApi();
?>
